import BrowseServicesContent from "./BrowseServicesContent";

export default async function BrowseServicePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const params = await searchParams;

    return (
        <BrowseServicesContent
            initialCategory={params.category ?? "All"}
        />
    );
}