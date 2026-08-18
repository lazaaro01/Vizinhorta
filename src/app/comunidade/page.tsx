import CommunityView from "@/components/CommunityView";

export default async function ComunidadePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return <CommunityView initialTab={tab} />;
}
