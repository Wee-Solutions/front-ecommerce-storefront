import { fetchStoreFaviconResponse } from "@/lib/store-favicon";

export const dynamic = "force-dynamic";

export default async function Icon() {
  const response = await fetchStoreFaviconResponse();
  if (response) return response;

  return new Response(null, { status: 404 });
}
