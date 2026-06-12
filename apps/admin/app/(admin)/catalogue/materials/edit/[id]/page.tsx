import { getMaterialById } from "@/actions/materials";
import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { MaterialForm } from "@/components/pages/materials/MaterialForm";
import { icons } from "@swastik/ui";
import { notFound } from "next/navigation";

type EditMaterialPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditMaterialPage({ params }: EditMaterialPageProps) {

    const { id } = await params;

    const material = await getMaterialById(id!);

    if (!material) {
        notFound();
    }

    return (
        <Page>
            <PageHeader
                title={`Edit Material: ${material.name}`}
                description="Update the details of the industry material."
                icon={icons.material}
            />
            <PageContent>
                <MaterialForm initialData={material} />
            </PageContent>
        </Page>
    );
}