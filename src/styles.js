import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    color: var(--cj-text-primary, #212529);
    background: var(--cj-bg, #ffffff);
    height: 100%;
    overflow: hidden;

    --cj-bg: #ffffff;
    --cj-card-bg: #f8f9fa;
    --cj-border: #e9ecef;
    --cj-text-primary: #212529;
    --cj-text-muted: #6c757d;
    --cj-accent-blue: #0d6efd;
    --cj-accent-teal: #0dcaf0;
    --cj-accent-green: #198754;
    --cj-accent-purple: #6f42c1;
    --cj-accent-gray: #adb5bd;
    --cj-rail-color: #dee2e6;
    --cj-skeleton: #e9ecef;
    --cj-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --cj-bg: #1a1a2e;
      --cj-card-bg: #252540;
      --cj-border: #3a3a5c;
      --cj-text-primary: #e9ecef;
      --cj-text-muted: #8b8fa8;
      --cj-rail-color: #3a3a5c;
      --cj-skeleton: #2e2e50;
      --cj-shadow: 0 1px 3px rgba(0,0,0,0.3);
      --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
    }
  }

  :host([dark]) {
    --cj-bg: #1a1a2e;
    --cj-card-bg: #252540;
    --cj-border: #3a3a5c;
    --cj-text-primary: #e9ecef;
    --cj-text-muted: #8b8fa8;
    --cj-rail-color: #3a3a5c;
    --cj-skeleton: #2e2e50;
    --cj-shadow: 0 1px 3px rgba(0,0,0,0.3);
    --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
  }

  /* ── Layout ─────────────────────────────────────────────── */

  .widget {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--cj-bg);
    overflow: hidden;
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--cj-border);
    flex-shrink: 0;
    background: var(--cj-bg);
    position: relative;
    z-index: 2;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--cj-text-primary);
    letter-spacing: -0.01em;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .event-count-badge {
    background: var(--cj-accent-blue);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
    transition: all 0.2s ease;
  }

  .event-count-badge.loading {
    background: var(--cj-accent-gray);
  }

  .ended-badge {
    font-size: 10px;
    font-weight: 600;
    color: var(--cj-text-muted);
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    padding: 2px 8px;
    border-radius: 10px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .status-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px 6px;
    border-bottom: 1px solid var(--cj-border);
    flex-shrink: 0;
    background: var(--cj-bg);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cj-accent-gray);
    flex-shrink: 0;
    transition: background 0.3s ease;
  }

  .status-dot.active {
    background: var(--cj-accent-green);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }

  .status-text {
    font-size: 11px;
    color: var(--cj-text-muted);
  }

  /* ── Timeline body ───────────────────────────────────────── */

  .timeline-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0 16px;
    scroll-behavior: smooth;
  }

  .timeline-body::-webkit-scrollbar {
    width: 4px;
  }

  .timeline-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .timeline-body::-webkit-scrollbar-thumb {
    background: var(--cj-border);
    border-radius: 2px;
  }

  .timeline-inner {
    position: relative;
    padding: 0 16px 0 36px;
  }

  /* Vertical rail */
  .timeline-inner::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--cj-rail-color);
  }

  /* ── Date separator ─────────────────────────────────────── */

  .date-separator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 10px -20px;
    position: relative;
  }

  .date-separator-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--cj-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    background: var(--cj-bg);
    padding: 0 8px 0 0;
  }

  .date-separator-line {
    flex: 1;
    height: 1px;
    background: var(--cj-border);
  }

  /* ── Event card ─────────────────────────────────────────── */

  .event-card-wrapper {
    position: relative;
    margin-bottom: 8px;
    animation: slideInCard 0.25s ease both;
  }

  @keyframes slideInCard {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rail-dot {
    position: absolute;
    left: -24px;
    top: 14px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--cj-bg);
    background: var(--cj-accent-gray);
    z-index: 1;
    transition: transform 0.15s ease;
  }

  .rail-dot.blue   { background: var(--cj-accent-blue); }
  .rail-dot.teal   { background: var(--cj-accent-teal); }
  .rail-dot.green  { background: var(--cj-accent-green); }
  .rail-dot.purple { background: var(--cj-accent-purple); }
  .rail-dot.gray   { background: var(--cj-accent-gray); }

  .event-card {
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    border-left-width: 3px;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: default;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: var(--cj-shadow);
  }

  .event-card:hover {
    transform: translateY(-1px);
    box-shadow: var(--cj-shadow-hover);
  }

  .event-card.blue   { border-left-color: var(--cj-accent-blue); }
  .event-card.teal   { border-left-color: var(--cj-accent-teal); }
  .event-card.green  { border-left-color: var(--cj-accent-green); }
  .event-card.purple { border-left-color: var(--cj-accent-purple); }
  .event-card.gray   { border-left-color: var(--cj-accent-gray); }

  .card-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 5px;
  }

  .source-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    padding: 2px 7px 2px 5px;
    border-radius: 10px;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .source-badge svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }

  .source-badge.blue   { background: color-mix(in srgb, var(--cj-accent-blue) 12%, transparent); color: var(--cj-accent-blue); }
  .source-badge.teal   { background: color-mix(in srgb, var(--cj-accent-teal) 12%, transparent); color: var(--cj-accent-teal); }
  .source-badge.green  { background: color-mix(in srgb, var(--cj-accent-green) 12%, transparent); color: var(--cj-accent-green); }
  .source-badge.purple { background: color-mix(in srgb, var(--cj-accent-purple) 12%, transparent); color: var(--cj-accent-purple); }
  .source-badge.gray   { background: color-mix(in srgb, var(--cj-accent-gray) 12%, transparent); color: var(--cj-text-muted); }

  .card-timestamp {
    font-size: 10px;
    color: var(--cj-text-muted);
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ── Card body: text + optional image ──────────────────── */

  .card-body {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .card-text-col {
    flex: 1;
    min-width: 0;
  }

  .card-image-col {
    flex-shrink: 0;
  }

  .product-thumb {
    display: block;
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--cj-border);
    background: var(--cj-skeleton);
    transition: opacity 0.2s ease, transform 0.15s ease;
  }

  .product-thumb:hover {
    opacity: 0.88;
    transform: scale(1.03);
  }

  .product-thumb-link {
    display: block;
    line-height: 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .card-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--cj-text-primary);
    margin-bottom: 5px;
    word-break: break-word;
  }

  .title-link {
    color: inherit;
    text-decoration: none;
  }

  .title-link:hover {
    text-decoration: underline;
    color: var(--cj-accent-blue);
  }

  .card-url {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: var(--cj-accent-blue);
    text-decoration: none;
    max-width: 100%;
    margin-bottom: 5px;
    word-break: break-all;
  }

  .card-url:hover { text-decoration: underline; }

  .card-url svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }

  .field-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 8px;
    margin-top: 4px;
  }

  .field-label {
    font-size: 10px;
    color: var(--cj-text-muted);
    font-weight: 500;
    white-space: nowrap;
    padding-top: 1px;
    text-transform: capitalize;
  }

  .field-value {
    font-size: 11px;
    font-weight: 500;
    color: var(--cj-text-primary);
    word-break: break-word;
  }

  .price-label {
    font-weight: 600;
  }

  .price-value {
    font-size: 12px;
    font-weight: 700;
    color: var(--cj-accent-green);
  }

  .show-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-top: 6px;
    font-size: 10px;
    color: var(--cj-text-muted);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    transition: color 0.15s ease;
  }

  .show-more-btn:hover { color: var(--cj-text-primary); }

  .show-more-btn svg {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
  }

  .show-more-btn.open svg { transform: rotate(180deg); }

  .secondary-fields {
    margin-top: 4px;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Call history card ──────────────────────────────── */

  .call-card-body {
    margin-top: 3px;
  }

  .call-disposition {
    font-size: 12px;
    font-weight: 600;
    color: var(--cj-text-primary);
  }

  .call-subtitle {
    font-size: 11px;
    color: var(--cj-text-muted);
    margin-top: 2px;
  }

  .call-direction {
    display: inline-block;
    margin-top: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--cj-text-muted);
    background: color-mix(in srgb, var(--cj-accent-gray) 15%, transparent);
    padding: 1px 6px;
    border-radius: 4px;
  }

  /* ── Skeleton ──────────────────────────────────────────── */

  .skeleton-wrapper {
    padding: 8px 16px 0 36px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skeleton-card {
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    border-left: 3px solid var(--cj-skeleton);
    border-radius: 8px;
    padding: 10px 12px;
    box-shadow: var(--cj-shadow);
  }

  .skel {
    background: var(--cj-skeleton);
    border-radius: 4px;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  .skel-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Empty / error / idle states ─────────────────────── */

  .center-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px 24px;
    text-align: center;
    gap: 8px;
  }

  .state-icon {
    color: var(--cj-text-muted);
    opacity: 0.5;
    margin-bottom: 4px;
  }

  .state-icon svg {
    width: 40px;
    height: 40px;
  }

  .state-heading {
    font-size: 13px;
    font-weight: 600;
    color: var(--cj-text-primary);
    margin: 0;
  }

  .state-subtext {
    font-size: 12px;
    color: var(--cj-text-muted);
    margin: 0;
    max-width: 220px;
    line-height: 1.6;
  }

  .error-banner {
    margin: 12px 16px;
    padding: 10px 12px;
    background: color-mix(in srgb, #dc3545 8%, transparent);
    border: 1px solid color-mix(in srgb, #dc3545 25%, transparent);
    border-radius: 8px;
    color: #dc3545;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .error-message {
    font-weight: 500;
  }

  .retry-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    color: #dc3545;
    background: none;
    border: 1px solid color-mix(in srgb, #dc3545 40%, transparent);
    border-radius: 6px;
    padding: 4px 10px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
  }

  .retry-btn:hover {
    background: color-mix(in srgb, #dc3545 10%, transparent);
  }

  .retry-btn svg {
    width: 12px;
    height: 12px;
  }

  /* Spinning refresh icon */
  .spin {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;
