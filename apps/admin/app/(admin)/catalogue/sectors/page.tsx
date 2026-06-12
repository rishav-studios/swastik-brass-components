"use client";
import { fetchSectors } from "@/actions/sectors";
import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { SectorCard } from "@/components/pages/sectors/SectorCard";
import { CreateButton } from "@/components/shared/ActionButtons";
import { Sector } from "@swastik/types";
import { icons } from "@swastik/ui/constants/icon";
import { useEffect, useState } from "react";

const SectorPage = () => {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSectors()
            .then((data) => {
                if (data && "error" in data) {
                    setError(data.error);
                } else {
                    setSectors(data);
                }
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch sectors");
            });
    }, []);

    return (
        <Page>
            <PageHeader title="Sectors" description="Manage your sectors" icon={icons.sector}>
                <CreateButton title="add new sector" url="/catalogue/sectors/new" />
            </PageHeader>
            <PageContent>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-4 gap-4">
                    {sectors.map((sector) => (
                        <SectorCard key={sector.id} {...sector} />
                    ))}
                </div>
            </PageContent>
        </Page>
    );
};

export default SectorPage



