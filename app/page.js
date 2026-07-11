import Home from "../src/Home";
import { getFirebaseSection } from "../src/firebaseData";
import { buildMetadata } from "../src/seo";

export const metadata = buildMetadata("home");

export default async function HomePage() {
  const services = await getFirebaseSection("Services");

  return <Home initialServices={services} />;
}
