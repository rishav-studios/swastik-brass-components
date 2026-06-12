"use client";

import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { SectorForm } from "@/components/pages/sectors/SectorForm";
import { icons } from "@swastik/ui";

const AddSectorPage = () => {
    return (
        <Page>
            <PageHeader title="Add New Sector" description="Create a new industry sector" icon={icons.sector} />
            <PageContent>
                <SectorForm />
            </PageContent>
        </Page>
    );
};

export default AddSectorPage;