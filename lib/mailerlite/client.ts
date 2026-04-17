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

function getGroupId(): string {
  const id = process.env.MAILERLITE_GROUP_ID_KIBBE_FUNNEL;
  if (!id) throw new Error('MAILERLITE_GROUP_ID_KIBBE_FUNNEL is not configured');
  return id;
}

export async function subscribeToKibbeFunnel(params: {
  email: string;
  firstName: string;
  kibbeType: KibbeTypeSlug;
  kibbeTypeDisplay: string;
}): Promise<{ subscriberId: string; alreadySubscribed: boolean }> {
  const apiKey = getApiKey();
  const groupId = getGroupId();
  const today = new Date().toISOString().split('T')[0];

  const payload = {
    email: params.email,
    fields: {
      name: params.firstName,
      kibbe_type: params.kibbeType,
      test_date: today,
    },
    groups: [groupId],
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
  let data: MailerLiteResponse;

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(`MailerLite returned invalid JSON: ${responseText.slice(0, 200)}`);
  }

  if (response.status === 422) {
    const parsed = JSON.parse(responseText) as { message?: string };
    if (parsed.message?.toLowerCase().includes('already')) {
      return { subscriberId: '', alreadySubscribed: true };
    }
    throw new Error(`MailerLite validation error: ${parsed.message}`);
  }

  if (!response.ok) {
    throw new Error(`MailerLite API error ${response.status}: ${responseText.slice(0, 200)}`);
  }

  const subscriberId = data.data.id;

  await addTagsToSubscriber(subscriberId, [
    'source-kibbe-test',
    `type-${params.kibbeType}`,
  ]);

  return { subscriberId, alreadySubscribed: false };
}

async function addTagsToSubscriber(subscriberId: string, tags: string[]): Promise<void> {
  const apiKey = getApiKey();

  for (const tag of tags) {
    try {
      const tagRes = await fetch(`${MAILERLITE_API_BASE}/tags`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
      });

      if (!tagRes.ok) continue;

      const tagData = await tagRes.json() as { data: Array<{ id: string; name: string }> };
      const existingTag = tagData.data.find((t) => t.name === tag);

      if (!existingTag) continue;

      await fetch(`${MAILERLITE_API_BASE}/subscribers/${subscriberId}/tags`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ tags: [existingTag.id] }),
      });
    } catch {
    }
  }
}

export async function updateSubscriberField(
  email: string,
  fields: Record<string, string | boolean>,
  tags?: string[]
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

  if (tags && tags.length > 0 && response.ok) {
    const data = await response.json() as MailerLiteResponse;
    await addTagsToSubscriber(data.data.id, tags);
  }
}
