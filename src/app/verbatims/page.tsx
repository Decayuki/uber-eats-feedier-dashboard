import { VerbatimsPageClient } from "@/components/verbatims/VerbatimsPageClient";

interface VerbatimsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VerbatimsPage({ searchParams }: VerbatimsPageProps) {
  const params = await searchParams;

  return (
    <VerbatimsPageClient
      initialParams={{
        search: typeof params.search === "string" ? params.search : undefined,
        segment: typeof params.segment === "string" ? params.segment : undefined,
        theme: typeof params.theme === "string" ? params.theme : undefined,
        sentiment: typeof params.sentiment === "string" ? params.sentiment : undefined,
        delai: typeof params.delai === "string" ? params.delai : undefined,
      }}
    />
  );
}
