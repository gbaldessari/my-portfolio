import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from '../config/site';
import { getLocaleFromPath, translatePath } from '../i18n/routes';
import { applySocialMeta, clearManagedSocialTags } from '../seo/documentMeta';

export interface PageSeoOptions {
  titleKey?: string;
  descriptionKey?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function usePageSeo({
  titleKey,
  descriptionKey,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageSeoOptions = {}) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const locale = getLocaleFromPath(pathname);
  const siteName = t('meta.siteName');
  const pageTitle = titleKey ? t(titleKey) : siteName;
  const documentTitle =
    pageTitle === siteName || pageTitle.includes(siteName)
      ? pageTitle
      : `${pageTitle} | ${siteName}`;
  const description = descriptionKey ? t(descriptionKey) : t('meta.defaultDescription');

  const esPath = translatePath(pathname, 'es');
  const enPath = translatePath(pathname, 'en');

  const socialMeta = useMemo(
    () => ({
      title: documentTitle,
      description,
      canonicalUrl: toAbsoluteUrl(pathname),
      image: toAbsoluteUrl(ogImage),
      locale,
      esUrl: toAbsoluteUrl(esPath),
      enUrl: toAbsoluteUrl(enPath),
      noindex,
    }),
    [documentTitle, description, pathname, ogImage, locale, esPath, enPath, noindex],
  );

  useEffect(() => {
    document.title = documentTitle;
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'es';
    applySocialMeta(socialMeta);

    return () => {
      clearManagedSocialTags();
    };
  }, [documentTitle, i18n.language, socialMeta]);
}

export { SITE_NAME };
