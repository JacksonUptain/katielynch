import Service from "../../../src/Service";
import {
  getFirebaseSection,
  getFirebaseSectionResult,
} from "../../../src/firebaseData";
import { buildMetadata } from "../../../src/seo";
import {
  findServiceByRouteParam,
  servicePath,
  serviceSlug,
} from "../../../src/routes";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getFirebaseSection("Services");

  return services
    .map((service) => serviceSlug(service))
    .filter(Boolean)
    .map((service) => ({ service }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const services = await getFirebaseSection("Services");
  const currentService = findServiceByRouteParam(services, service);

  if (!currentService) {
    return buildMetadata("serviceDetail", {
      title: "Service Details",
      path: `/services/${service}`,
    });
  }

  return buildMetadata("serviceDetail", {
    title: currentService.title,
    description:
      currentService["short-description"] ||
      currentService.description ||
      undefined,
    path: servicePath(currentService),
    image: currentService.image || undefined,
  });
}

export default async function ServicePage({ params }) {
  const { service } = await params;
  const result = await getFirebaseSectionResult("Services");
  const currentService = findServiceByRouteParam(result.items, service);

  return (
    <Service
      routeService={service}
      initialServices={result.items}
      initialService={currentService || null}
    />
  );
}
