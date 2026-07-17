import seoConfig from "./seo.config.json";
import { assetPath, basePath } from "./sitePaths";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || seoConfig.siteUrl;

function normalizePath(path = "/") {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function withBasePath(path = "/") {
  const normalizedPath = normalizePath(path);
  if (!basePath || normalizedPath.startsWith(`${basePath}/`) || normalizedPath === basePath) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBasePath(path), siteUrl).toString();
}

export function getPageSeo(pageKey) {
  return seoConfig.pages[pageKey] || {};
}

export function buildMetadata(pageKey, overrides = {}) {
  const page = getPageSeo(pageKey);
  const business = seoConfig.business || {};
  const location = business.location || {};
  const title = String(
    overrides.title || page.title || seoConfig.defaultTitle
  ).trim();
  const description = String(
    overrides.description || page.description || seoConfig.defaultDescription
  ).trim();
  const path = withBasePath(overrides.path || page.path || "/");
  const image = assetPath(overrides.image || page.image || seoConfig.defaultImage);
  const robots = overrides.robots || page.robots || { index: true, follow: true };
  const localTags = {
    "geo.region":
      location.country && location.region
        ? `${location.country}-${location.region}`
        : undefined,
    "geo.placename": business.locationName,
  };

  return {
    metadataBase: new URL(siteUrl),
    applicationName: seoConfig.siteName,
    title,
    description,
    creator: business.founderName || seoConfig.siteName,
    publisher: business.legalName || seoConfig.siteName,
    manifest: withBasePath("/manifest.webmanifest"),
    icons: {
      icon: assetPath("/favicon.ico"),
      apple: assetPath(seoConfig.defaultImage),
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
    other: Object.fromEntries(
      Object.entries(localTags).filter(([, value]) => Boolean(value))
    ),
  };
}

export { seoConfig };
