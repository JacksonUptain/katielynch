import Services from "../../src/Services";
import { getFirebaseSection } from "../../src/firebaseData";
import JsonLd from "../../src/JsonLd";
import { buildMetadata } from "../../src/seo";
import {
  servicesItemListStructuredData,
  webPageStructuredData,
} from "../../src/structuredData";

export const metadata = buildMetadata("services", {
  robots: { index: false, follow: true },
});

export default async function ServicesPage() {
  const services = await getFirebaseSection("Services");

  return (
    <>
      <JsonLd data={webPageStructuredData("services")} />
      <JsonLd data={servicesItemListStructuredData(services)} />
      <Services initialServices={services} />
    </>
  );
}
