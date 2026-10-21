// Public marketing vocabulary only. Add planned campaign labels here before use.
import { productSlugs } from './analytics-core.mjs';

export const campaignSources = new Set(['google','bing','linkedin','facebook','instagram','pinterest','newsletter','whatsapp']);
export const campaignMedia = new Set(['cpc','ppc','paid_search','paid_social','email','social','referral']);
export const campaignNames = new Set([...productSlugs,'packaging','custom-packaging','samples','catalogue']);
const key = 'welltroy-public-campaign-v1';
const lifetime = 30 * 60 * 1000;

export function campaignInfo(search) {
  try {
    if (typeof search !== 'string' || search.length > 4096) return {};
    const params = new URLSearchParams(search);
    const values = ['utm_source','utm_medium','utm_campaign'].map(name => {
      const all = params.getAll(name);
      return all.length === 1 ? all[0] : '';
    });
    const [source, medium, name] = values;
    if (!campaignSources.has(source) || !campaignMedia.has(medium) || !campaignNames.has(name)) return {};
    return {campaign_source:source, campaign_medium:medium, campaign_name:name};
  } catch { return {}; }
}

export function clearCampaign(storage) {
  try { storage?.removeItem(key); } catch { /* blocked storage must not affect browsing */ }
}

// Called only after analytics consent. Never store raw landing URLs or queries.
export function campaignForVisit(search, storage, {referrer = '', origin = 'https://welltroy.com', now = Date.now()} = {}) {
  const current = campaignInfo(search);
  if (current.campaign_source) {
    try { storage?.setItem(key, JSON.stringify({campaign:current, expires:now + lifetime})); } catch { /* in-memory attribution still works */ }
    return current;
  }
  try {
    const params = new URLSearchParams(search);
    const explicit = [...params.keys()].some(name => name.startsWith('utm_'));
    const external = referrer && new URL(referrer).origin !== origin;
    if (explicit || external) { clearCampaign(storage); return {}; }
    const saved = JSON.parse(storage?.getItem(key) || 'null');
    if (!saved || !Number.isFinite(saved.expires) || saved.expires <= now || saved.expires > now + lifetime) {
      clearCampaign(storage); return {};
    }
    // Revalidate storage instead of trusting values that other scripts can edit.
    return campaignInfo(new URLSearchParams({
      utm_source:saved.campaign?.campaign_source || '',
      utm_medium:saved.campaign?.campaign_medium || '',
      utm_campaign:saved.campaign?.campaign_name || ''
    }).toString());
  } catch { return {}; }
}
