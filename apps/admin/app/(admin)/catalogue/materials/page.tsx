"use client";

import { fetchMaterials } from "@/actions/materials";
import { Page, PageContent, PageHeader } from "@/components/layout/Page";
import { MaterialCard } from "@/components/pages/materials/MaterialCard";
import { CreateButton } from "@/components/shared/ActionButtons";
import { Material } from "@swastik/types";
import { icons } from "@swastik/ui";
import { useEffect, useState } from "react";

const MaterialPage = () => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMaterials()
            .then((data) => {
                if (data && "error" in data) {
                    setError(data.error);
                } else {
                    setMaterials(data);
                }
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch materials");
            });
    }, []);

    return (
        <Page>
            <PageHeader title="Materials" description="Manage your materials" icon={icons.material}>
                <CreateButton title="add new material" url="/catalogue/materials/new" />
            </PageHeader>
            <PageContent>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-4 gap-4">
                    {materials.map((material) => (
                        <MaterialCard key={material.id} material={material} />
                    ))}
                </div>
            </PageContent>
        </Page>
    );
};

export default MaterialPage;