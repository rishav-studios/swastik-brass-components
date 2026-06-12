import { DeleteButton, EditButton } from "@/components/shared/ActionButtons";
import { MaterialGrade } from "@swastik/types";
import { icons } from "@swastik/ui";

export const MaterialGradeCard = ({ ...grade }: MaterialGrade) => {
    // Extract keys to map over the composition JSON
    const compKeys = grade.chemical_composition ? Object.keys(grade.chemical_composition) : [];
    const hasComposition = compKeys.length > 0;

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col p-4">

            {/* Header: Identity */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-500/20 shrink-0">
                        <icons.flaskConical className="w-4 h-4" />
                    </div>
                    <h3 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                        {grade.name}
                    </h3>
                </div>
            </div>

            {/* Body: Chemical Composition Tags */}
            <div className="flex-1 mb-4">
                {hasComposition ? (
                    <div className="flex flex-wrap gap-1.5">
                        {compKeys.map((key) => (
                            <div
                                key={key}
                                className="flex items-center text-[11px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-md overflow-hidden"
                            >
                                <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200/80 dark:border-slate-700/80">
                                    {key}
                                </span>
                                <span className="px-1.5 py-0.5 text-slate-500 dark:text-slate-400 font-mono">
                                    {grade.chemical_composition![key]}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 italic px-1 bg-slate-50 dark:bg-slate-800/30 p-2 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                        <icons.database className="w-3 h-3" />
                        No composition data available
                    </div>
                )}
            </div>

            {/* Footer: Actions & Internal ID */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0 mt-auto">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                    ID: {grade.id}
                </span>

                <div className="flex gap-1">
                    <EditButton url={`/catalogue/materials/grades/${grade.id}`} />
                    <DeleteButton onClick={() => { }} />
                </div>
            </div>
        </div>
    );
};