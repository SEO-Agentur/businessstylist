const MAILERLITE_API_BASE = 'https://connect.mailerlite.com/api';

const VALID_KIBBE_TYPES = [
  'dramatic',
  'soft-dramatic',
  'flamboyant-natural',
  'natural',
  'soft-natural',
  'dramatic-classic',
  'classic',
  'soft-classic',
  'flamboyant-gamine',
  'gamine',
  'soft-gamine',
  'romantic',
  'theatrical-romantic',
] as const;

export type KibbeTypeSlug = (typeof VALID_KIBBE_TYPES)[number];

export function isValidKibbeType(slug: string): slug is KibbeTypeSlug {
  return VALID_KIBBE_TYPES.includes(slug as KibbeTypeSlug);
}

export const KIBBE_TYPE_DISPLAY_MAP: Record<KibbeTypeSlug, string> = {
  'dramatic': 'Dramatic',
  'soft-dramatic': 'Soft Dramatic',
  'flamboyant-natural': 'Flamboyant Natural',
  'natural': 'Natural',
  'soft-natural': 'Soft Natural',
  'dramatic-classic': 'Dramatic Classic',
  'classic': 'Classic',
  'soft-classic': 'Soft Classic',
  'flamboyant-gamine': 'Flamboyant Gamine',
  'gamine': 'Gamine',
  'soft-gamine': 'Soft Gamine',
  'romantic': 'Romantic',
  'theatrical-romantic': 'Theatrical Romantic',
};

const KIBBE_TYPE_TO_GROUP_ENV: Record<KibbeTypeSlug, string> = {
  'dramatic': 'MAILERLITE_GROUP_ID_DRAMATIC',
  'soft-dramatic': 'MAILERLITE_GROUP_ID_SOFT_DRAMATIC',
  'flamboyant-natural': 'MAILERLITE_GROUP_ID_FLAMBOYANT_NATURAL',
  'natural': 'MAILERLITE_GROUP_ID_NATURAL',
  'soft-natural': 'MAILERLITE_GROUP_ID_SOFT_NATURAL',
  'flamboyant-gamine': 'MAILERLITE_GROUP_ID_FLAMBOYANT_GAMINE',
  'gamine': 'MAILERLITE_GROUP_ID_GAMINE',
  'soft-gamine': 'MAILERLITE_GROUP_ID_SOFT_GAMINE',
  'dramatic-classic': 'MAILERLITE_GROUP_ID_DRAMATIC_CLASSIC',
  'classic': 'MAILERLITE_GROUP_ID_CLASSIC',
  'soft-classic': 'MAILERLITE_GROUP_ID_SOFT_CLASSIC',
  'theatrical-romantic': 'MAILERLITE_GROUP_ID_THEATRICAL_ROMANTIC',
  'romantic': 'MAILERLITE_GROUP_ID_ROMANTIC',
};

interface MailerLiteSubscriber {
  id: string;
  email: string;
  status: string;
  fields: Record<string, string | null>;
}

interface MailerLiteResponse {
  data: MailerLiteSubscriber;
}

function getApiKey(): string {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) throw new Error('MAILERLITE_API_KEY is not configured');
  return key;
}

function getFunnelGroupId(): string {
  const id = process.env.MAILERLITE_GROUP_ID_KIBBE_FUNNEL;
  if (!id) throw new Error('MAILERLITE_GROUP_ID_KIBBE_FUNNEL is not configured');
  return id;
}

function getTypeGroupId(slug: KibbeTypeSlug): string {
  const envKey = KIBBE_TYPE_TO_GROUP_ENV[slug];
  const id = process.env[envKey];
  if (!id) throw new Error(`${envKey} is not configured`);
  return id;
}

export async function subscribeToKibbeFunnel(params: {
  email: string;
  firstName: string;
  kibbeType: KibbeTypeSlug;
  kibbeTypeDisplay: string;
}): Promise<{ subscriberId: string; alreadySubscribed: boolean }> {
  const apiKey = getApiKey();
  const funnelGroupId = getFunnelGroupId();
  const typeGroupId = getTypeGroupId(params.kibbeType);
  const today = new Date().toISOString().split('T')[0];

  const payload = {
    email: params.email,
    fields: {
      name: params.firstName,
      kibbe_type: params.kibbeType,
      test_date: today,
    },
    groups: [funnelGroupId, typeGroupId],
    status: 'active',
  };

  const response = await fetch(`${MAILERLITE_API_BASE}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (response.status === 422) {
    const parsed = JSON.parse(responseText) as { message?: string };
    if (parsed.message?.toLowerCase().includes('already')) {
      return { subscriberId: '', alreadySubscribed: true };
    }
    throw new Error(`MailerLite validation error: ${parsed.message}`);
  }

  if (!response.ok) {
    console.error('MailerLite API error:', response.status, responseText.slice(0, 300));
    throw new Error(`MailerLite API error ${response.status}: ${responseText.slice(0, 200)}`);
  }

  let data: MailerLiteResponse;
  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(`MailerLite returned invalid JSON: ${responseText.slice(0, 200)}`);
  }

  return { subscriberId: data.data.id, alreadySubscribed: false };
}

export async function updateSubscriberField(
  email: string,
  fields: Record<string, string | boolean>
): Promise<void> {
  const apiKey = getApiKey();

  const response = await fetch(
    `${MAILERLITE_API_BASE}/subscribers/${encodeURIComponent(email)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!response.ok && response.status !== 404) {
    const text = await response.text();
    throw new Error(`MailerLite update error ${response.status}: ${text.slice(0, 200)}`);
  }
}
