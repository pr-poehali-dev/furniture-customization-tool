import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_URL = "https://eliut.ru";

export default function SEOHead({ title, description, canonical, schema, breadcrumbs }: SEOHeadProps) {
  const fullTitle = title.includes("ЭЛИУТ") ? title : `${title} — ЭЛИУТ`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Главная", "item": BASE_URL },
          ...breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 2,
            "name": b.name,
            "item": `${BASE_URL}${b.path}`,
          })),
        ],
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
}
