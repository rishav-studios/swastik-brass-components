"use client";

import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { MaterialForm } from "@/components/pages/materials/MaterialForm";
import { icons } from "@swastik/ui";

const AddMaterialPage = () => {
    return (
        <Page>
            <PageHeader title="Add New Material" description="Create a new material" icon={icons.sector} />
            <PageContent>
                <MaterialForm />
            </PageContent>
        </Page>
    );
};

export default AddMaterialPage;