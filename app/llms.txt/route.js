import {
  getFirebaseSectionResult,
} from "../../src/firebaseData";
import { buildLlmsText } from "../../src/llms";

export const dynamic = "force-static";

export async function GET() {
  const [services, resources, essays] = await Promise.all([
    getFirebaseSectionResult("Services"),
    getFirebaseSectionResult("Blog"),
    getFirebaseSectionResult("Essays"),
  ]);

  return new Response(
    buildLlmsText({
      services: services.items,
      resources: resources.items,
      essays: essays.items,
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
