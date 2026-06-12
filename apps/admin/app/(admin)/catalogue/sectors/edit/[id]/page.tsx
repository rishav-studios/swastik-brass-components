import { getSectorById } from "@/actions/sectors";
import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { SectorForm } from "@/components/pages/sectors/SectorForm";
import { icons } from "@swastik/ui";
import { notFound } from "next/navigation";

type EditSectorPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditSectorPage({ params }: EditSectorPageProps) {

    const { id } = await params;

    const sector = await getSectorById(id!);

    if (!sector) {
        notFound();
    }

    return (
        <Page>
            <PageHeader
                title={`Edit Sector: ${sector.name}`}
                description="Update the details of the industry sector."
                icon={icons.sector}
            />
            <PageContent>
                <SectorForm initialData={sector} />
            </PageContent>
        </Page>
    );
}