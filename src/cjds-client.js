/**
 * Resolve a customer alias (ANI, email) to a CJDS person identityId.
 * Uses the JDS admin alias-search endpoint (POST, workspace-scoped).
 *
 * @param {string} baseUrl   e.g. https://api-jds.wxdap-produs1.webex.com
 * @param {string} token     Bearer token
 * @param {string} workspaceId
 * @param {string} alias     phone number or email
 * @returns {Promise<string>} identityId
 */
export async function resolveIdentity(baseUrl, token, workspaceId, alias) {
  const url = `${baseUrl}/admin/v1/api/person/workspace-id/${workspaceId}/aliases/search`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ aliases: [alias] }),
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const body = await res.json();
  const identities = body.data ?? [];
  if (!identities.length) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });

  return identities[0].id ?? identities[0].identityId;
}

/**
 * Fetch recent journey events for a given identityId.
 * Uses the JDS events endpoint (POST, workspace-scoped, CloudEvents response).
 *
 * @param {string} baseUrl
 * @param {string} token
 * @param {string} workspaceId
 * @param {string} identityId
 * @param {number} [limit=20]
 * @returns {Promise<Array>} events sorted newest-first
 */
export async function fetchJourneyEvents(baseUrl, token, workspaceId, identityId, limit = 20) {
  const url = `${baseUrl}/v1/api/events/workspace-id/${workspaceId}/identity?page=1&pageSize=${limit}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identityId }),
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const body = await res.json();
  const events = Array.isArray(body.data) ? body.data : [];

  // Sort newest-first; events use CloudEvents `time` field
  return events.slice().sort((a, b) => {
    const ta = new Date(a.time ?? a.createdAt ?? 0);
    const tb = new Date(b.time ?? b.createdAt ?? 0);
    return tb - ta;
  });
}

/**
 * Extract the customer identity from an interaction payload.
 * Handles both Desktop-framework-injected interactionData and SDK event payloads.
 *
 * @param {object} interaction
 * @returns {string|null}
 */
export function extractCustomerIdentity(interaction) {
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
