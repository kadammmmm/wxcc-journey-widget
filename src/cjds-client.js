/**
 * Resolve a customer alias (ANI / email) to a CJDS person identityId.
 *
 * @param {string} baseUrl        e.g. https://api-jds.wxdap-produs1.webex.com
 * @param {string} token          Bearer token
 * @param {string} workspaceId
 * @param {string} organizationId
 * @param {string} alias          phone number or email (will be URL-encoded)
 * @returns {Promise<string>}     identityId
 */
export async function resolveIdentity(baseUrl, token, workspaceId, organizationId, alias) {
  const url = `${baseUrl}/admin/v1/api/person/workspace-id/${workspaceId}/aliases/${encodeURIComponent(alias)}?organizationId=${encodeURIComponent(organizationId)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const body = await res.json();
  const identities = Array.isArray(body.data) ? body.data : [];
  if (!identities.length) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });

  return identities[0].id ?? identities[0].identityId;
}

/**
 * Fetch recent journey events for a given customer alias.
 * Uses the alias directly — no separate identity resolution step needed.
 *
 * @param {string} baseUrl
 * @param {string} token
 * @param {string} workspaceId
 * @param {string} organizationId
 * @param {string} alias          phone number or email (will be URL-encoded)
 * @param {number} [limit=20]
 * @returns {Promise<Array>}      events sorted newest-first (CloudEvents format)
 */
export async function fetchJourneyEvents(baseUrl, token, workspaceId, organizationId, alias, limit = 20) {
  const url = `${baseUrl}/v1/api/events/workspace-id/${workspaceId}?organizationId=${encodeURIComponent(organizationId)}&identity=${encodeURIComponent(alias)}&limit=${limit}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const body = await res.json();
  const events = Array.isArray(body.data) ? body.data : [];

  // Parse nested stringified JSON if dataContentType indicates it
  const parsed = events.map(evt => {
    if (evt.dataContentType === 'string' && typeof evt.data === 'string') {
      try { return { ...evt, data: JSON.parse(evt.data) }; } catch { return evt; }
    }
    return evt;
  });

  // Sort newest-first; events use CloudEvents `time` field
  return parsed.slice().sort((a, b) => new Date(b.time ?? b.createdAt ?? 0) - new Date(a.time ?? a.createdAt ?? 0));
}

/**
 * Extract the customer identity from an interaction payload.
 * Outbound calls use dnis (dialed number); inbound use ani.
 *
 * @param {object} interaction
 * @returns {string|null}
 */
export function extractCustomerIdentity(interaction) {
  if (interaction?.contactDirection === 'OUTBOUND') {
    return interaction.dnis ?? null;
  }
  return (
    interaction?.ani ??
    interaction?.phoneNumber ??
    interaction?.callAssociatedData?.ani?.value ??
    interaction?.callAssociatedData?.ani ??
    interaction?.callAssociatedData?.email?.value ??
    interaction?.callAssociatedData?.email ??
    interaction?.callAssociatedDetails?.ani ??
    null
  );
}
