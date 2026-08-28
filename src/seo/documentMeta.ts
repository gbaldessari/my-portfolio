function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"][data-seo-managed]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const hreflang = extra?.hreflang;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"][data-seo-managed]`
    : `link[rel="${rel}"][data-seo-managed]:not([hreflang])`;

  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
  if (hreflang) {
    element.setAttribute('hreflang', hreflang);
  } else {
    element.removeAttribute('hreflang');
  }
}

function clearManagedLinks(rel: string) {
  document.head
    .querySelectorAll<HTMLLinkElement>(`link[rel="${rel}"][data-seo-managed]`)
    .forEach((element) => element.remove());
}

export function clearManagedSocialTags() {
  document.head
    .querySelectorAll('meta[data-seo-managed], link[data-seo-managed]')
    .forEach((element) => element.remove());
}

export interface SocialMetaInput {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  locale: 'es' | 'en';
  esUrl: string;
  enUrl: string;
  noindex?: boolean;
}

export function applySocialMeta({
  title,
  description,
  canonicalUrl,
  image,
  locale,
  esUrl,
  enUrl,
  noindex,
}: SocialMetaInput) {
  clearManagedSocialTags();

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:locale', locale === 'es' ? 'es_CL' : 'en_US');
  upsertMeta('property', 'og:locale:alternate', locale === 'es' ? 'en_US' : 'es_CL');
  upsertMeta('property', 'og:site_name', 'Giacomo Baldessari');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);

  upsertLink('canonical', canonicalUrl);
  clearManagedLinks('alternate');
  upsertLink('alternate', esUrl, { hreflang: 'es' });
  upsertLink('alternate', enUrl, { hreflang: 'en' });
  upsertLink('alternate', esUrl, { hreflang: 'x-default' });
}
