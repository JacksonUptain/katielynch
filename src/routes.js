export function slugify(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function serviceSlug(service = {}) {
  return slugify(service.slug || service.title || service.id || "");
}

export function servicePath(service = {}) {
  const slug = serviceSlug(service);
  return slug ? `/services/${encodeURIComponent(slug)}` : "/services";
}

export function findServiceByRouteParam(services = [], routeParam = "") {
  const decodedParam = decodeURIComponent(String(routeParam || ""));
  const normalizedParam = slugify(decodedParam);
  const lowerParam = decodedParam.toLowerCase();

  return services.find((service) => {
    const title = String(service.title || "");
    const id = String(service.id || "");
    const explicitSlug = String(service.slug || "");

    return (
      serviceSlug(service) === normalizedParam ||
      slugify(title) === normalizedParam ||
      title.toLowerCase() === lowerParam ||
      id.toLowerCase() === lowerParam ||
      explicitSlug.toLowerCase() === lowerParam
    );
  });
}
