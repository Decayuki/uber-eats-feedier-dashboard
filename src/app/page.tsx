import { redirect } from "next/navigation";

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => query.append(key, entry));
      return;
    }
    if (typeof value === "string") {
      query.set(key, value);
    }
  });

  redirect(query.toString() ? `/synthese?${query.toString()}` : "/synthese");
}
