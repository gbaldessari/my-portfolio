import { useEffect, useMemo } from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[] | null | undefined;
}

function JsonLd({ data }: JsonLdProps) {
  const serialized = useMemo(
    () => (data ? JSON.stringify(data) : ''),
    [data],
  );

  useEffect(() => {
    if (!serialized) return undefined;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = serialized;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [serialized]);

  return null;
}

export default JsonLd;
