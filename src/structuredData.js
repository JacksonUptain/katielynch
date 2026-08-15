import seoConfig from "./seo.config.json";
import { absoluteUrl, getPageSeo } from "./seo";
import { pagePaths, servicePath } from "./routes";

const business = seoConfig.business || {};
const location = business.location || {};
const localBusinessId = absoluteUrl("/#local-business");
const personId = absoluteUrl("/#katie-lynch");
const websiteId = absoluteUrl("/#website");

const pageTypes = {
  about: "AboutPage",
  services: "CollectionPage",
  blog: "CollectionPage",
  essay: "CollectionPage",
  contact: "ContactPage",
  serviceDetail: "ItemPage",
};

function toAbsoluteUrl(url = "/") {
  if (!url) return absoluteUrl("/");
  if (/^https?:\/\//i.test(url)) return url;
  return absoluteUrl(url);
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry === undefined || entry === null || entry === "") return false;
      if (Array.isArray(entry) && entry.length === 0) return false;
      return true;
    })
  );
}

function businessAddress() {
  return compactObject({
    "@type": "PostalAddress",
    addressLocality: location.locality,
    addressRegion: location.region,
    addressCountry: location.country,
  });
}

function areaServed() {
  return (business.areaServed || []).map((name) => ({
    "@type": "Place",
    name,
  }));
}

function serviceOffer(name) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      serviceType: name,
      provider: { "@id": localBusinessId },
      areaServed: areaServed(),
    },
  };
}

function serviceDescription(service = {}) {
  return String(
    service["short-description"] ||
      service.description ||
      getPageSeo("serviceDetail").description ||
      ""
  ).trim();
}

function breadcrumbNode(items = [], idPath = "/") {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(idPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function webPageNode(pageKey, overrides = {}) {
  const page = getPageSeo(pageKey);
  const path = overrides.path || page.path || "/";
  const title = overrides.title || page.title || seoConfig.defaultTitle;
  const description =
    overrides.description || page.description || seoConfig.defaultDescription;
  const image = toAbsoluteUrl(overrides.image || page.image || seoConfig.defaultImage);
  const url = absoluteUrl(path);
  const breadcrumbId = path === "/" ? undefined : `${url}#breadcrumb`;

  return compactObject({
    "@type": overrides.type || pageTypes[pageKey] || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": localBusinessId },
    breadcrumb: breadcrumbId ? { "@id": breadcrumbId } : undefined,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: image,
    },
    inLanguage: "en-US",
  });
}

export function siteStructuredData() {
  const defaultImage = toAbsoluteUrl(seoConfig.defaultImage);
  const logoImage = toAbsoluteUrl(seoConfig.logoImage || seoConfig.defaultImage);

  return {
    "@context": "https://schema.org",
    "@graph": [
      compactObject({
        "@type": "WebSite",
        "@id": websiteId,
        name: seoConfig.siteName,
        url: absoluteUrl("/"),
        description: seoConfig.defaultDescription,
        inLanguage: "en-US",
        publisher: { "@id": localBusinessId },
      }),
      compactObject({
        "@type": ["LocalBusiness", "ProfessionalService", "EducationalOrganization"],
        "@id": localBusinessId,
        name: business.displayName || seoConfig.siteName,
        legalName: business.legalName,
        alternateName: business.alternateNames,
        description: seoConfig.defaultDescription,
        url: absoluteUrl("/"),
        logo: logoImage,
        image: [defaultImage],
        telephone: business.telephone,
        email: business.email,
        address: businessAddress(),
        areaServed: areaServed(),
        founder: { "@id": personId },
        employee: { "@id": personId },
        knowsAbout: business.knowsAbout,
        sameAs: business.sameAs,
        makesOffer: (business.serviceTypes || []).map(serviceOffer),
      }),
      compactObject({
        "@type": "Person",
        "@id": personId,
        name: business.founderName,
        jobTitle: business.jobTitle,
        description: business.personDescription,
        url: absoluteUrl(pagePaths.about),
        image: toAbsoluteUrl(
          business.personImage || seoConfig.logoImage || seoConfig.defaultImage
        ),
        email: business.email,
        telephone: business.telephone,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer inquiries",
          email: business.email,
          telephone: business.telephone,
          availableLanguage: "English",
          areaServed: "US",
        },
        worksFor: { "@id": localBusinessId },
        homeLocation: {
          "@type": "Place",
          name: business.locationName,
          address: businessAddress(),
        },
        areaServed: areaServed(),
        knowsAbout: business.knowsAbout,
        sameAs: business.sameAs,
      }),
    ],
  };
}

export function webPageStructuredData(pageKey, overrides = {}) {
  const page = getPageSeo(pageKey);
  const path = overrides.path || page.path || "/";
  const title = overrides.title || page.title || seoConfig.defaultTitle;
  const pageNode = webPageNode(pageKey, overrides);

  if (path === "/") {
    return {
      "@context": "https://schema.org",
      ...pageNode,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageNode,
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: title, path },
        ],
        path
      ),
    ],
  };
}

export function servicesItemListStructuredData(services = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(pagePaths.services)}#services`,
    name: "Educational services, tutoring, and virtual classes from Katie Lynch",
    description: getPageSeo("services").description,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(servicePath(service)),
      item: serviceStructuredData(service, false),
    })),
  };
}

export function serviceStructuredData(service = {}, includeContext = true) {
  const url = absoluteUrl(servicePath(service));

  return compactObject({
    ...(includeContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: serviceDescription(service),
    url,
    image: service.image ? toAbsoluteUrl(service.image) : undefined,
    provider: { "@id": localBusinessId },
    areaServed: areaServed(),
    mainEntityOfPage: url,
  });
}

export function servicePageStructuredData(service = {}) {
  const path = servicePath(service);
  const title = String(service.title || "Educational Service").trim();
  const description = serviceDescription(service);
  const image = service.image || seoConfig.defaultImage;
  const pageNode = webPageNode("serviceDetail", {
    type: "ItemPage",
    path,
    title,
    description,
    image,
  });
  const serviceNode = serviceStructuredData(service, false);

  pageNode.mainEntity = { "@id": serviceNode["@id"] };

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageNode,
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Educational Services", path: pagePaths.services },
          { name: title, path },
        ],
        path
      ),
      serviceNode,
    ],
  };
}
