import { useMemo } from 'react';
import JsonLd from './JsonLd';
import { createPersonSchema, createWebSiteSchema } from '../../seo/jsonLd';

function SeoDefaults() {
  const data = useMemo(
    () => [createPersonSchema(), createWebSiteSchema()].filter(Boolean) as Record<string, unknown>[],
    [],
  );

  return <JsonLd data={data} />;
}

export default SeoDefaults;
