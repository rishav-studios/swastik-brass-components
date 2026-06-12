import { icons } from "@swastik/ui";
import { LinkTag } from "@swastik/ui/components/shared/LinkTag";
import { Text } from "@swastik/ui/components/typography/Text";

type EditButtonProps = {
    url: string;
    title?: string;

}
export const EditButton = ({ url, title = "Edit" }: EditButtonProps) => {
    return (
        <LinkTag href={url} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-lg transition-colors" title={title}>
            <icons.edit3 className="w-4 h-4" />
        </LinkTag>
    )
}

type DeleteButtonProps = {
    onClick: () => void;
    title?: string;
}
export const DeleteButton = ({ onClick, title = "Delete" }: DeleteButtonProps) => {
    return (
        <button onClick={onClick} className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-colors" title={title}>
            <icons.delete className="w-4 h-4" />
        </button>
    )
}

type CreateButtonProps = {
    url: string;
    title?: string;
}
export const CreateButton = ({ url, title = "Add new" }: CreateButtonProps) => {
    return (
        <LinkTag variant="button-brand" href={url} title={title} className="group/create-button h-10 gap-0 overflow-hidden relative">
            <div className="flex items-center justify-center w-4 h-4 overflow-hidden transition-all duration-300 ease-in-out group-hover/create-button:w-0 group-hover/create-button:opacity-0 group-hover/create-button:mr-0 mr-2">
                <icons.plus className="w-4 h-4 min-w-[16px] transition-all duration-300 ease-in-out group-hover/create-button:rotate-90 group-hover/create-button:-translate-x-4" />
            </div>
            <Text className="group-hover/create-button:text-white transition-all duration-300 ease-in-out select-none">
                {title}
            </Text>
            <div className="flex items-center justify-center w-0 h-4 overflow-hidden transition-all duration-300 ease-in-out group-hover/create-button:w-4 group-hover/create-button:opacity-100 group-hover/create-button:ml-2 opacity-0 ml-0">
                <icons.arrowRight className="w-4 h-4 min-w-[16px] transition-all duration-300 ease-in-out translate-x-4 group-hover/create-button:translate-x-0" />
            </div>
        </LinkTag>
    )
}