import { deleteMaterial } from "@/actions/materials";
import { deleteProductsByMaterialId, findProductsByMaterialId } from "@/actions/products";
import { DeleteButton, EditButton } from "@/components/shared/ActionButtons";
import { Material } from "@swastik/types";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@swastik/ui/components/shadcn/dialog";
import { toast } from "@swastik/ui/components/shadcn/sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export type MaterialCardProps = Pick<Material, "id" | "name" | "slug" | "description" | "image_url" | "composition_template" | "seo_metadata" | "display_order">

export const MaterialCard = ({ material }: { material: MaterialCardProps }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoadingCount, setIsLoadingCount] = useState(false);
    const [productCount, setProductCount] = useState<number | null>(null);

    const hasSeo = Boolean(material.seo_metadata && material.seo_metadata.meta_title);
    // Simple check to see if the JSON template has keys
    const hasComposition = material.composition_template && Object.keys(material.composition_template).length > 0;

    const handleDeleteClick = async () => {
        setIsDialogOpen(true);
        setIsLoadingCount(true);
        const res = await findProductsByMaterialId(material.id);
        if ('error' in res) {
            toast.error(res.error);
            setIsDialogOpen(false);
        } else {
            setProductCount(res.count);
        }
        setIsLoadingCount(false);
    };

    const confirmDelete = () => {
        startTransition(async () => {
            const promise = (async () => {
                if (productCount && productCount > 0) {
                    const prodRes = await deleteProductsByMaterialId(material.id);
                    if (prodRes && 'error' in prodRes) {
                        throw new Error(prodRes.error);
                    }
                }
                const matRes = await deleteMaterial(material.id);
                if (matRes && 'error' in matRes) {
                    throw new Error(matRes.error);
                }
            })();

            toast.promise(promise, {
                loading: "Deleting material...",
                success: () => {
                    setIsDialogOpen(false);
                    router.refresh();
                    window.location.reload();
                    return "Material deleted successfully";
                },
                error: (err) => err.message
            });
        });
    };

    return (
        <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden p-1.5">

            {/* Top Section: Swatch Image & Absolute Actions */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <img
                    src={material.image_url}
                    alt={`${material.name} texture swatch`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtle inner shadow for depth on textures */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none" />



                {/* Display Order Badge (Floating over image) */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold shadow-sm border border-white/20 dark:border-slate-700">
                    <icons.layoutList className="w-3.5 h-3.5" />
                    <span>{material.display_order}</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-4 pt-4 pb-3 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <div className="pr-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                            {material.name}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1 gap-1 font-medium">
                            <span>/{material.slug}</span>
                            <a href={`/materials/${material.slug}`} className="hover:text-blue-600 transition-colors ml-1" title="View Material Page">
                                <icons.externalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-3 mb-4 leading-relaxed flex-1">
                    {material.description}
                </p>

                {/* Info Strip (ID & Badges) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">

                    <div className="flex gap-2">
                        {/* Composition Template Badge */}
                        <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border ${hasComposition ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`} title="Composition Data">
                            {hasComposition ? <icons.dna className="w-3 h-3" /> : <icons.database className="w-3 h-3" />}
                            <span className="font-medium hidden sm:inline-block">Composition</span>
                        </div>

                        {/* SEO Badge */}
                        <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border ${hasSeo ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}`} title="SEO Metadata">
                            <icons.globe className="w-3.5 h-3.5" />
                            <span className="font-medium hidden sm:inline-block">seo</span>
                            {hasSeo ? <icons.checkCircle2 className="w-3 h-3" /> : <icons.alertCircle className="w-3 h-3" />}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                        <EditButton url={`/catalogue/materials/edit/${material.id}`} />
                        <DeleteButton onClick={handleDeleteClick} />
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Material</DialogTitle>
                        <DialogDescription>
                            {isLoadingCount ? (
                                <span className="flex items-center gap-2 mt-2">
                                    <icons.loader2 className="w-4 h-4 animate-spin" /> Checking dependencies...
                                </span>
                            ) : (
                                <span className="block mt-2">
                                    {productCount && productCount > 0
                                        ? `There are ${productCount} products associated with this material. Deleting this material will also delete all these products. This action cannot be undone.`
                                        : "Once the material is deleted, this action can't be undone. Are you sure you want to proceed?"}
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isPending}>Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isPending || isLoadingCount}
                        >
                            {isPending ? <icons.loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
