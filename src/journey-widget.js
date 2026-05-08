import { LitElement, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styles } from './styles.js';
import { ICONS, getIconForSource } from './icons.js';
import { formatRelativeTime, getDateGroupLabel } from './time-utils.js';
import { resolveIdentity, fetchJourneyEvents, extractCustomerIdentity } from './cjds-client.js';

/** Render a named SVG icon as actual markup (SVGs are trusted, defined in-package). */
const icon = (name) => unsafeHTML(ICONS[name] ?? '');

// ── Noise field configuration ─────────────────────────────────────────────────
// These fields will be collapsed under a "show more" toggle on each card.
const SECONDARY_FIELDS = ['demoId', 'companyName'];

// These fields are never rendered in the key/value grid (already rendered elsewhere).
const SKIP_FIELDS = ['title', 'url', 'timestamp', 'source', 'productName', 'imageUrl', 'productUrl'];
// ─────────────────────────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 15000;

const STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  EMPTY: 'empty',
  ERROR: 'error',
};

/** Map a source/type string to a color class name. Handles both free-form strings
 *  and CloudEvent type patterns like "page:view" or "task:new". */
function colorForSource(source) {
  if (!source) return 'gray';
  const s = source.toLowerCase();
  if (s.includes('page') || s.includes('web') || s.includes('site') || s.includes('browse')) return 'blue';
  if (s.includes('chat') || s.includes('message')) return 'teal';
  if (s.includes('voice') || s.includes('phone') || s.includes('call') || s.includes('task') || s.includes('telephon')) return 'green';
  if (s.includes('email') || s.includes('mail')) return 'purple';
  return 'gray';
}

/** Capitalize words and replace underscores with spaces for field label display. */
function humanizeKey(key) {
  return key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/** Format a field value — detects 13-digit epoch-ms timestamps. */
function formatFieldValue(v) {
  if (/^\d{13}$/.test(v)) {
    try { return new Date(Number(v)).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }); }
    catch { /* fall through */ }
  }
  return v;
}

class JourneyWidget extends LitElement {
  static properties = {
    baseUrl:        { type: String, attribute: 'base-url' },
    workspaceId:    { type: String, attribute: 'workspace-id' },
    organizationId: { type: String, attribute: 'organization-id' },
    // Injected by the Desktop framework via $STORE bindings in the layout JSON
    bearerToken:    { type: String, attribute: 'bearer-token' },
    interactionData: { type: Object },
    // internal reactive state
    _state: { state: true },
    _events: { state: true },
    _statusText: { state: true },
    _polling: { state: true },
    _interactionEnded: { state: true },
    _errorMsg: { state: true },
    _errorCode: { state: true },
    _expandedCards: { state: true },
  };

  static styles = styles;

  constructor() {
    super();
    this.baseUrl = 'https://api-jds.wxdap-produs1.webex.com';
    this.workspaceId = '';
    this.organizationId = '';
    this.bearerToken = '';
    this.interactionData = null;
    this._state = STATE.IDLE;
    this._events = [];
    this._statusText = 'Waiting for interaction';
    this._polling = false;
    this._interactionEnded = false;
    this._errorMsg = null;
    this._errorCode = null;
    this._expandedCards = new Set();
    this._pollTimer = null;
    this._identityId = null;
    this._customerIdentity = null;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopPolling();
  }

  updated(changedProps) {
    if (!changedProps.has('interactionData')) return;
    const data = this.interactionData;
    if (!data) return;

    // isTerminated signals the contact has ended
    if (data.isTerminated) {
      this._onContactEnded();
      return;
    }

    const state = (data.state ?? '').toLowerCase();
    // connected = active call/chat; wrapup = post-contact wrap-up (journey still relevant)
    if (state === 'connected' || state === 'accepted' || state === 'wrapup') {
      this._onContactAccepted(data);
    }
  }

  async _onContactAccepted(interaction) {
    this._interactionEnded = false;
    const identity = extractCustomerIdentity(interaction);

    if (!identity) {
      this._state = STATE.ERROR;
      this._errorMsg = 'Could not extract customer identity from interaction.';
      this._errorCode = 'NO_IDENTITY';
      return;
    }

    this._customerIdentity = identity;
    this._identityId = null;
    this._events = [];
    this._expandedCards = new Set();
    this._state = STATE.LOADING;
    this._statusText = 'Loading journey…';

    await this._loadJourney();
    this._startPolling();
  }

  _onContactEnded() {
    this._interactionEnded = true;
    this._polling = false;
    this._statusText = 'Interaction ended';
    this._stopPolling();
  }

  async _loadJourney() {
    try {
      if (!this.workspaceId) throw Object.assign(new Error('workspace-id property is not configured'), { code: 'API_ERROR' });

      const token = this.bearerToken;
      if (!token) throw Object.assign(new Error('No bearer token — check $STORE.auth.accessToken binding'), { code: 'AUTH_ERROR' });

      if (!this._identityId) {
        this._identityId = await resolveIdentity(this.baseUrl, token, this.workspaceId, this.organizationId, this._customerIdentity);
      }

      const raw = await fetchJourneyEvents(this.baseUrl, token, this.workspaceId, this.organizationId, this._customerIdentity);
      // Keep task:ended (completed call records) + all non-task journey events.
      // Drop intermediate task state events (new/connect/connected/parked/wrapup) — they're noise.
      const events = raw
        .filter(evt => {
          const t = (evt.type ?? '').toLowerCase();
          return !t.startsWith('task:') || t === 'task:ended';
        })
        .slice(0, 25);
      this._events = events;
      this._state = events.length === 0 ? STATE.EMPTY : STATE.LOADED;
      this._statusText = 'Updated just now';
      this._polling = true;
      this._errorMsg = null;
      this._errorCode = null;
    } catch (err) {
      this._state = STATE.ERROR;
      this._polling = false;
      this._errorCode = err.code ?? 'API_ERROR';
      switch (this._errorCode) {
        case 'AUTH_ERROR':
          this._errorMsg = 'Authentication failed. The session token may have expired.';
          break;
        case 'NOT_FOUND':
          this._errorMsg = `No journey data found for this customer.`;
          break;
        default:
          this._errorMsg = `Failed to load journey data: ${err.message}`;
      }
    }
  }

  _startPolling() {
    this._stopPolling();
    if (this._interactionEnded) return;
    this._pollTimer = setInterval(() => {
      if (!this._interactionEnded) this._loadJourney();
    }, POLL_INTERVAL_MS);
  }

  _stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }

  _retry() {
    this._state = STATE.LOADING;
    this._errorMsg = null;
    this._loadJourney();
  }

  _toggleCard(id) {
    const next = new Set(this._expandedCards);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._expandedCards = next;
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  _renderHeader() {
    const { _state, _events, _polling, _interactionEnded } = this;
    const isLoading = _state === STATE.LOADING;

    return html`
      <div class="header">
        <div class="header-left">
          <span class="header-title">Journey Timeline</span>
        </div>
        <div class="header-right">
          ${_interactionEnded
            ? html`<span class="ended-badge">Ended</span>`
            : nothing}
          <span class="event-count-badge ${isLoading ? 'loading' : ''}">
            ${isLoading
              ? html`<span class="spin" style="display:inline-block;width:10px;height:10px;">${icon('refresh')}</span>`
              : _events.length}
          </span>
        </div>
      </div>
      <div class="status-row">
        <div class="status-dot ${_polling && !_interactionEnded ? 'active' : ''}"></div>
        <span class="status-text">${this._statusText}</span>
      </div>
    `;
  }

  _renderIdle() {
    return html`
      <div class="center-state">
        <div class="state-icon">${icon('lock')}</div>
        <p class="state-heading">Waiting for interaction…</p>
        <p class="state-subtext">Journey events will appear when a contact is accepted.</p>
      </div>
    `;
  }

  _renderLoading() {
    const skelCard = (w1, w2) => html`
      <div class="skeleton-card">
        <div class="skel-row">
          <div class="skel" style="width:${w1}px;height:14px;"></div>
          <div class="skel" style="width:50px;height:10px;margin-top:2px;"></div>
        </div>
        <div class="skel" style="width:${w2}px;height:12px;margin-bottom:6px;"></div>
        <div class="skel" style="width:100%;height:10px;margin-bottom:3px;"></div>
        <div class="skel" style="width:75%;height:10px;"></div>
      </div>
    `;
    return html`
      <div class="skeleton-wrapper">
        ${skelCard(80, 160)}
        ${skelCard(70, 140)}
        ${skelCard(90, 120)}
      </div>
    `;
  }

  _renderEmpty() {
    return html`
      <div class="center-state">
        <div class="state-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" opacity="0.4"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <p class="state-heading">No journey events yet</p>
        <p class="state-subtext">Events will appear here as the customer interacts.</p>
      </div>
    `;
  }

  _renderError() {
    const isApiError = this._errorCode === 'API_ERROR';
    return html`
      <div class="error-banner">
        <div class="error-message">${this._errorMsg}</div>
        ${isApiError ? html`
          <button class="retry-btn" @click=${this._retry}>
            <span style="display:inline-block;width:12px;height:12px;">${icon('refresh')}</span>
            Retry
          </button>
        ` : nothing}
      </div>
    `;
  }

  _renderSourceBadge(source) {
    const color = colorForSource(source);
    const iconKey = getIconForSource(source);
    const label = source ? source.replace(/_/g, ' ') : 'Unknown';
    return html`
      <span class="source-badge ${color}">
        <span style="display:inline-flex;width:11px;height:11px;">${icon(iconKey)}</span>
        ${label}
      </span>
    `;
  }

  _renderCard(event) {
    const { id, type, data = {} } = event;
    // CloudEvents use `time`; legacy CJDS used `createdAt`
    const timestamp = event.time ?? event.createdAt;
    const source = data.source ?? type ?? '';
    const color = colorForSource(source);
    const title = data.productName ?? data.title ?? data.page ?? humanizeKey(type);
    const isExpanded = this._expandedCards.has(id);
    const imageUrl = data.imageUrl ?? null;
    const productUrl = data.productUrl ?? null;

    // Compute primary and secondary visible fields
    const primaryFields = [];
    const secondaryFields = [];

    for (const [k, v] of Object.entries(data)) {
      if (SKIP_FIELDS.includes(k)) continue;
      if (v === null || v === undefined || v === '') continue;
      const entry = { k, v: String(v) };
      if (SECONDARY_FIELDS.includes(k)) secondaryFields.push(entry);
      else primaryFields.push(entry);
    }

    const hasSecondary = secondaryFields.length > 0;

    return html`
      <div class="event-card-wrapper">
        <div class="rail-dot ${color}"></div>
        <div class="event-card ${color}">
          <div class="card-top-row">
            ${this._renderSourceBadge(source)}
            <span class="card-timestamp">${formatRelativeTime(timestamp)}</span>
          </div>
          <div class="card-body">
            <div class="card-text-col">
              <div class="card-title">
                ${productUrl
                  ? html`<a class="title-link" href="${productUrl}" target="_blank" rel="noopener noreferrer">${title}</a>`
                  : title}
              </div>
              ${data.url ? html`
                <a class="card-url" href="${data.url}" target="_blank" rel="noopener noreferrer">
                  <span style="display:inline-flex;width:11px;height:11px;">${icon('external-link')}</span>
                  <span class="url-text">${data.url}</span>
                </a>
              ` : nothing}
              ${primaryFields.length ? html`
                <div class="field-grid">
                  ${primaryFields.map(({ k, v }) => html`
                    <span class="field-label ${k === 'price' ? 'price-label' : ''}">${humanizeKey(k)}</span>
                    <span class="field-value ${k === 'price' ? 'price-value' : ''}">${formatFieldValue(v)}</span>
                  `)}
                </div>
              ` : nothing}
              ${hasSecondary ? html`
                <button
                  class="show-more-btn ${isExpanded ? 'open' : ''}"
                  @click=${() => this._toggleCard(id)}
                >
                  <span style="display:inline-flex;width:12px;height:12px;">${icon('chevron-down')}</span>
                  ${isExpanded ? 'Show less' : `Show ${secondaryFields.length} more`}
                </button>
                ${isExpanded ? html`
                  <div class="secondary-fields">
                    <div class="field-grid">
                      ${secondaryFields.map(({ k, v }) => html`
                        <span class="field-label">${humanizeKey(k)}</span>
                        <span class="field-value">${formatFieldValue(v)}</span>
                      `)}
                    </div>
                  </div>
                ` : nothing}
              ` : nothing}
            </div>
            ${imageUrl ? html`
              <div class="card-image-col">
                ${productUrl ? html`
                  <a href="${productUrl}" target="_blank" rel="noopener noreferrer" class="product-thumb-link">
                    <img
                      class="product-thumb"
                      src="${imageUrl}"
                      alt="${title}"
                      loading="lazy"
                      @error=${(e) => { const col = e.target.closest('.card-image-col'); if (col) col.style.display = 'none'; }}
                    />
                  </a>
                ` : html`
                  <img
                    class="product-thumb"
                    src="${imageUrl}"
                    alt="${title}"
                    loading="lazy"
                    @error=${(e) => { const col = e.target.closest('.card-image-col'); if (col) col.style.display = 'none'; }}
                  />
                `}
              </div>
            ` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  _renderCallCard(event) {
    const { data = {} } = event;
    const timestamp = event.time ?? event.createdAt;

    // Disposition: try several common field names WxCC uses for wrap-up reason
    const disposition =
      data.wrapUpReason ?? data.wrapupReason ?? data.wrapupCode ??
      data.reason ?? data.disposition ?? 'N/A';

    const agentName = data.agentName ?? data.agentDisplayName ?? null;
    const queueName = data.queueName ?? data.channelName ?? null;
    const subtitle = [agentName, queueName].filter(Boolean).join(' • ');
    const direction = (data.direction ?? '').toUpperCase();

    return html`
      <div class="event-card-wrapper">
        <div class="rail-dot green"></div>
        <div class="event-card call-card green">
          <div class="card-top-row">
            ${this._renderSourceBadge('telephony')}
            <span class="card-timestamp">${formatRelativeTime(timestamp)}</span>
          </div>
          <div class="call-card-body">
            <div class="call-disposition">${disposition}</div>
            ${subtitle ? html`<div class="call-subtitle">${subtitle}</div>` : nothing}
            ${direction ? html`<div class="call-direction">${direction}</div>` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  _renderTimeline() {
    const events = this._events;
    const items = [];
    let lastLabel = null;

    for (const event of events) {
      const label = getDateGroupLabel(event.time ?? event.createdAt);
      if (label !== lastLabel) {
        items.push(html`
          <div class="date-separator">
            <span class="date-separator-label">${label}</span>
            <div class="date-separator-line"></div>
          </div>
        `);
        lastLabel = label;
      }
      const isCall = (event.type ?? '').toLowerCase().startsWith('task:');
      items.push(isCall ? this._renderCallCard(event) : this._renderCard(event));
    }

    return html`
      <div class="timeline-body">
        <div class="timeline-inner">${items}</div>
      </div>
    `;
  }

  render() {
    const { _state } = this;
    return html`
      <div class="widget">
        ${this._renderHeader()}
        ${_state === STATE.IDLE    ? this._renderIdle()    : nothing}
        ${_state === STATE.LOADING ? this._renderLoading() : nothing}
        ${_state === STATE.ERROR   ? this._renderError()   : nothing}
        ${_state === STATE.EMPTY   ? this._renderEmpty()   : nothing}
        ${_state === STATE.LOADED  ? this._renderTimeline(): nothing}
      </div>
    `;
  }
}

if (!customElements.get('cj-timeline-widget')) {
  customElements.define('cj-timeline-widget', JourneyWidget);
}
