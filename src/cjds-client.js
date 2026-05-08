/**
 * Resolve a customer identity string (ANI, email, etc.) to a CJDS identityId.
 * @param {string} baseUrl
 * @param {string} token
 * @param {string} alias - phone number or email
 * @returns {Promise<string>} identityId
 */
export async function resolveIdentity(baseUrl, token, alias) {
  const url = `${baseUrl}/customer-journey/v1/identities?aliases=${encodeURIComponent(alias)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const data = await res.json();

  // Response is an array of identity objects; grab the first id
  const identities = Array.isArray(data) ? data : data.identities ?? [];
  if (!identities.length) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });

  return identities[0].id ?? identities[0].identityId;
}

/**
 * Fetch the most recent journey events for a given identityId.
 * @param {string} baseUrl
 * @param {string} token
 * @param {string} identityId
 * @param {number} [limit=25]
 * @returns {Promise<Array>} events sorted newest-first
 */
export async function fetchJourneyEvents(baseUrl, token, identityId, limit = 25) {
  const url = `${baseUrl}/customer-journey/v1/journey/${encodeURIComponent(identityId)}/events?limit=${limit}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
  if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
  if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

  const data = await res.json();
  const events = Array.isArray(data) ? data : data.events ?? [];

  // Guarantee newest-first order
  return events.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Extract the customer identity from an interaction payload.
 * Priority: callAssociatedData.ani > callAssociatedData.email > callAssociatedDetails.ani
 * @param {object} interaction
 * @returns {string|null}
 */
export function extractCustomerIdentity(interaction) {
  // Top-level ani/email — how the Desktop framework surfaces it via interactionData property
  // Nested callAssociatedData — SDK event payload shape
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
