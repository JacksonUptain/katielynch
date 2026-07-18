import Service from "../../../src/Service";
import {
  getFirebaseSection,
  getFirebaseSectionResult,
} from "../../../src/firebaseData";
import JsonLd from "../../../src/JsonLd";
import { buildMetadata } from "../../../src/seo";
import {
  findServiceByRouteParam,
  pagePaths,
  servicePath,
  serviceSlug,
} from "../../../src/routes";
import {
  serviceStructuredData,
  webPageStructuredData,
} from "../../../src/structuredData";

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
      path: `${pagePaths.services}/${service}`,
    });
  }

  const description =
    currentService["short-description"] ||
    currentService.description ||
    `Learn about ${currentService.title}`;

  return buildMetadata("serviceDetail", {
    title: currentService.title,
    description: `${description} Katie Lynch offers in-person support in Manassas and Northern Virginia plus virtual classes for online students.`,
    path: servicePath(currentService),
    image: currentService.image || undefined,
  });
}

export default async function EducationalServicePage({ params }) {
  const { service } = await params;
  const result = await getFirebaseSectionResult("Services");
  const currentService = findServiceByRouteParam(result.items, service);
  const structuredData = currentService
    ? serviceStructuredData(currentService)
    : webPageStructuredData("serviceDetail", {
        title: "Service Details",
        path: `${pagePaths.services}/${service}`,
      });

  return (
    <>
      <JsonLd data={structuredData} />
      <Service
        routeService={service}
        initialServices={result.items}
        initialService={currentService || null}
      />
    </>
  );
}
