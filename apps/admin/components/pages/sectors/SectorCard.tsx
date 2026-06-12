"use client";

import { deleteProductsBySectorId, findProductsBySectorId } from "@/actions/products";
import { deleteSector } from "@/actions/sectors";
import { DeleteButton, EditButton } from "@/components/shared/ActionButtons";
import { Sector } from "@swastik/types";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@swastik/ui/components/shadcn/dialog";
import { toast } from "@swastik/ui/components/shadcn/sonner";
import { LinkTag } from "@swastik/ui/components/shared/LinkTag";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export type SectorCardProps = Pick<
    Sector,
    | "id"
    | "name"
    | "slug"
    | "home_description"
    | "image_url"
    | "cover_image_url"
    | "display_order"
    | "outline_image_url"
    | "seo_metadata"
    | "dedicated_description"
>

export const SectorCard = ({ ...sector }: SectorCardProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoadingCount, setIsLoadingCount] = useState(false);
    const [productCount, setProductCount] = useState<number | null>(null);

    const hasSeo = Boolean(sector.seo_metadata && sector.seo_metadata.meta_title);
    const hasDedicatedPage = Boolean(sector.dedicated_description);

    const handleDeleteClick = async () => {
        setIsDialogOpen(true);
        setIsLoadingCount(true);
        const res = await findProductsBySectorId(sector.id);
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
                    const prodRes = await deleteProductsBySectorId(sector.id);
                    if (prodRes && 'error' in prodRes) {
                        throw new Error(prodRes.error);
                    }
                }
                const secRes = await deleteSector(sector.id);
                if (secRes && 'error' in secRes) {
                    throw new Error(secRes.error);
                }
            })();

            toast.promise(promise, {
                loading: "Deleting sector...",
                success: () => {
                    setIsDialogOpen(false);
                    router.refresh();
                    window.location.reload();
                    return "Sector deleted successfully";
                },
                error: (err) => err.message
            });
        });
    };

    return (
        <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden">



            {/* Cover Image Header */}
            <div className="h-32 relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={sector.cover_image_url}
                    alt={`${sector.name} cover`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient Overlay for text readability if needed, and to blend with content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent mix-blend-multiply dark:from-black/80" />
            </div>

            {/* Floating Icon / Image */}
            <div className="absolute top-20 left-5 z-10 p-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative">
                    <img
                        src={sector.image_url}
                        alt={`${sector.name} icon`}
                        className="w-full h-full object-cover"
                    />
                    {sector.outline_image_url && (
                        <img
                            src={sector.outline_image_url}
                            alt=""
                            className="w-full h-full absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 object-cover"
                        />
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 px-5 pt-10 pb-5 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {sector.name}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-1 font-medium">
                            <span>/{sector.slug}</span>
                            <LinkTag href={`/sectors/${sector.slug}`} variant="custom" className="hover:text-blue-600 transition-colors" title="View Page">
                                <icons.externalLink className="w-3.5 h-3.5" />
                            </LinkTag>
                        </div>
                    </div>

                    {/* Display Order Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700" title="Display Order">
                        <icons.layoutList className="w-3.5 h-3.5" />
                        <span>{sector.display_order}</span>
                    </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-3 leading-relaxed flex-1">
                    {sector.home_description}
                </p>

                {/* Badges / Metadata Indicators */}
                <div className="flex flex-wrap gap-2 mt-5">
                    <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${hasSeo ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}`}>
                        <icons.globe className="w-3.5 h-3.5" />
                        <span className="font-medium">SEO</span>
                        {hasSeo ? <icons.checkCircle2 className="w-3 h-3" /> : <icons.alertCircle className="w-3 h-3" />}
                    </div>

                    {hasDedicatedPage && (
                        <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                            <icons.fileText className="w-3.5 h-3.5" />
                            <span className="font-medium">Dedicated Page</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Admin Actions Footer */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center transition-colors">
                <div className="flex gap-2">
                    <EditButton url={`/catalogue/sectors/edit/${sector.id}`} />
                    <DeleteButton onClick={handleDeleteClick} />
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Sector</DialogTitle>
                        <DialogDescription>
                            {isLoadingCount ? (
                                <span className="flex items-center gap-2 mt-2">
                                    <icons.loader2 className="w-4 h-4 animate-spin" /> Checking dependencies...
                                </span>
                            ) : (
                                <span className="block mt-2">
                                    {productCount && productCount > 0
                                        ? `There are ${productCount} products associated with this sector. Deleting this sector will also delete all these products. This action cannot be undone.`
                                        : "Once the sector is deleted, this action can't be undone. Are you sure you want to proceed?"}
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