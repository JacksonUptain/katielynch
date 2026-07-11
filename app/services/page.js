import Services from "../../src/Services";
import { getFirebaseSection } from "../../src/firebaseData";
import { buildMetadata } from "../../src/seo";

export const metadata = buildMetadata("services");

export default async function ServicesPage() {
  const services = await getFirebaseSection("Services");

  return <Services initialServices={services} />;
}
