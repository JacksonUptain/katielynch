import NotFound from "../src/NotFound";
import { buildMetadata } from "../src/seo";

export const metadata = buildMetadata("notFound");

export default function NotFoundPage() {
  return <NotFound />;
}
