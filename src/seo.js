import seoConfig from "./seo.config.json";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || seoConfig.siteUrl;

function normalizePath(path = "/") {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(normalizePath(path), siteUrl).toString();
}

export function getPageSeo(pageKey) {
  return seoConfig.pages[pageKey] || {};
}

export function buildMetadata(pageKey, overrides = {}) {
  const page = getPageSeo(pageKey);
  const title = String(
    overrides.title || page.title || seoConfig.defaultTitle
  ).trim();
  const description = String(
    overrides.description || page.description || seoConfig.defaultDescription
  ).trim();
  const path = normalizePath(overrides.path || page.path || "/");
  const image = overrides.image || page.image || seoConfig.defaultImage;
  const robots = overrides.robots || page.robots || { index: true, follow: true };

  return {
    metadataBase: new URL(siteUrl),
    applicationName: seoConfig.siteName,
    title,
    description,
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.ico",
      apple: seoConfig.defaultImage,
    },
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots,
  };
}

export { seoConfig };
