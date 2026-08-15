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

function hasFileExtension(pathname = "") {
  const finalSegment = pathname.split("/").filter(Boolean).at(-1) || "";
  return finalSegment.includes(".");
}

export function canonicalPath(path = "/") {
  const basedPath = withBasePath(path);
  const suffixIndex = basedPath.search(/[?#]/);
  const pathname = suffixIndex === -1 ? basedPath : basedPath.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : basedPath.slice(suffixIndex);

  if (pathname.endsWith("/") || hasFileExtension(pathname)) {
    return `${pathname}${suffix}`;
  }

  return `${pathname}/${suffix}`;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(canonicalPath(path), siteUrl).toString();
}

export function getPageSeo(pageKey) {
  return seoConfig.pages[pageKey] || {};
}

export function fitMetaDescription(value = "", maxLength = 160) {
  const description = String(value).replace(/\s+/g, " ").trim();
  if (description.length <= maxLength) return description;

  const shortened = description.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const cutAt = lastSpace > 80 ? lastSpace : shortened.length;
  return `${shortened.slice(0, cutAt).trim()}…`;
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
  const path = canonicalPath(overrides.path || page.path || "/");
  const usesDefaultImage = !(overrides.image || page.image);
  const image = assetPath(overrides.image || page.image || seoConfig.defaultImage);
  const imageAlt =
    overrides.imageAlt || page.imageAlt ||
    (overrides.image || page.image ? title : seoConfig.defaultImageAlt || title);
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
    keywords: seoConfig.keywords,
    authors: [
      {
        name: business.founderName || seoConfig.siteName,
        url: absoluteUrl(getPageSeo("about").path || "/about"),
      },
    ],
    creator: business.founderName || seoConfig.siteName,
    publisher: business.legalName || seoConfig.siteName,
    category: "education",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: withBasePath("/manifest.webmanifest"),
    icons: {
      icon: assetPath("/favicon.ico"),
      apple: assetPath(seoConfig.logoImage || seoConfig.defaultImage),
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
          alt: imageAlt,
          ...(usesDefaultImage
            ? {
                width: seoConfig.defaultImageWidth,
                height: seoConfig.defaultImageHeight,
                type: "image/png",
              }
            : {}),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      ...robots,
      googleBot: {
        index: robots.index !== false,
        follow: robots.follow !== false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: Object.fromEntries(
      Object.entries(localTags).filter(([, value]) => Boolean(value))
    ),
  };
}

export { seoConfig };
