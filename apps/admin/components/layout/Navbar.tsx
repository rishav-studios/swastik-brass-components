'use client';

import { createBrowserSupabaseClient } from '@swastik/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@swastik/ui/components/shadcn/avatar';
import { Button } from '@swastik/ui/components/shadcn/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@swastik/ui/components/shadcn/dropdown-menu';
import { useSidebar } from '@swastik/ui/components/shadcn/sidebar';
import { LinkTag } from '@swastik/ui/components/shared/LinkTag';
import { icons } from '@swastik/ui/constants/icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push("/login");
    };

    return (
        <nav className='fixed h-16 bg-white border-b px-6 flex items-center justify-between w-[calc(100%-16rem)] z-999'>
            <div className="flex items-center gap-4">
                <Button
                    onClick={toggleSidebar}
                    className="rounded-md flex md:hidden p-1 hover:bg-sidebar-accent"
                    aria-label="Toggle sidebar"
                    variant="outline"
                >
                    {<icons.sidebarToggle className="size-5 transition-transform duration-200" />}
                </Button>
            </div>

            <div className="flex items-center gap-4 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex justify-center items-center gap-2 hover:bg-accent/50 p-2 rounded-md">
                        <Avatar className="h-9 w-9 border border-gray-100 hover:opacity-90 transition-opacity">
                            <AvatarImage src="/avatar-placeholder.png" alt="Savan Patel" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                SP
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-0.5 text-left">
                            <span className="text-sm font-semibold text-gray-800 leading-none">Admin</span>
                            <span className="text-xs text-gray-500 font-light truncate max-w-[140px]">{user?.email}</span>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 mt-2 bg-white rounded-lg border border-gray-100 shadow-md p-1.5">
                        <DropdownMenuLabel className="flex items-center gap-2.5 font-normal">
                            <Avatar className="h-9 w-9 border border-gray-100">
                                <AvatarImage src="/avatar-placeholder.png" alt="Savan Patel" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                    S
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-0.5 text-left">
                                <span className="text-sm font-semibold text-gray-800 leading-none">Admin</span>
                                <span className="text-xs text-gray-500 font-light truncate max-w-[140px]">{user?.email}</span>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="-mx-1.5 my-1.5 bg-gray-100 h-px" />

                        <DropdownMenuItem asChild className="hover:bg-primary! group text-gray-500 hover:text-primary-foreground! rounded-md transition-colors cursor-pointer">
                            <LinkTag href="/profile" variant="custom" className="flex items-center w-full gap-2 px-2.5 py-2 text-sm font-medium">
                                <icons.profile className="size-4 text-gray-500 group-hover:text-primary-foreground" />
                                <span>Profile</span>
                            </LinkTag>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="-mx-1.5 my-1.5 bg-gray-100 h-px" />

                        <DropdownMenuItem className="hover:bg-red-50 focus:bg-red-50 rounded-md transition-colors cursor-pointer px-0" onClick={handleLogout}>

                            <button className="flex items-center w-full gap-2 px-2.5 py-2 text-sm text-red-600 font-medium">
                                <icons.logout className="size-4 text-red-500" />
                                <span>Log out</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export default Navbar