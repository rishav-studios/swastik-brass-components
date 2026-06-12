'use client';

import { Button } from "@swastik/ui/components/shadcn/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@swastik/ui/components/shadcn/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@swastik/ui/components/shadcn/sidebar";
import { LinkTag } from "@swastik/ui/components/shared/LinkTag";
import { Text } from "@swastik/ui/components/typography/Text";
import { icons } from "@swastik/ui/constants/icon";
import { cn } from "@swastik/ui/lib/utils";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';

const sidebarGroups = [
    {
        label: "Overview",
        items: [
            { label: 'Dashboard', icon: icons.dashboard, href: '/' }
        ]
    },
    {
        label: "Catalogue",
        items: [
            { label: 'Sectors', icon: icons.sector, href: '/catalogue/sectors' },
            { label: 'Materials', icon: icons.sector, href: '/catalogue/materials' },
            { label: 'Grades', icon: icons.sector, href: '/catalogue/materials/grades' },
            { label: 'Products', icon: icons.product, href: '/catalogue/products' },
        ]
    },
    {
        label: "Facilities",
        items: [
            { label: 'Facility', icon: icons.facility, href: '/facilities' },
            { label: 'Facility Group', icon: icons.facilityGroup, href: '/facilities/group' },
            { label: 'Facility Category', icon: icons.facilityCategory, href: '/facilities/categories' }
        ]
    },
    {
        label: "Enquiries",
        items: [
            { label: 'Contacts', icon: icons.contact, href: '/contacts' },
            { label: 'Quote Requests', icon: icons.quoteRequest, href: '/quote-requests' }
        ]
    },
    {
        label: "Blogs",
        items: [
            { label: 'Categories', icon: icons.blogCategory, href: '/blogs/categories' },
            { label: 'Posts', icon: icons.blogPost, href: '/blogs/posts' },
        ]
    },
    {
        label: "Company",
        items: [
            { label: 'General', icon: icons.companyGeneral, href: '/company/general' },
            { label: 'Statistics', icon: icons.companyStatistics, href: '/company/statistics' },
            { label: 'Journey', icon: icons.companyJourney, href: '/company/journey' }
        ]
    },
];

export default function AppSidebar() {
    // 1. Add the mounted state
    const [isMounted, setIsMounted] = useState(false);

    const { toggleSidebar, state, isMobile } = useSidebar();
    const pathname = usePathname();

    // 2. Set mounted to true once the client takes over
    useEffect(() => {
        setIsMounted(true);
    }, []);



    // 3. Return a skeleton or null during SSR to avoid the ID mismatch
    if (!isMounted) {
        // Returning null works, but returning a blank sidebar skeleton 
        // prevents the rest of your app layout from shifting when it loads.
        return (
            <div className="w-(--sidebar-width) h-screen border-r bg-white" />
        );
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b h-16 bg-white">
                <div className="flex items-center my-auto justify-between">

                    <div className='flex gap-1 items-center relative'>
                        <Image src="/logo.svg" alt="Swastik Logo" width={160} height={100} />
                    </div>

                    <Button
                        onClick={toggleSidebar}
                        className="rounded-md p-1 hover:bg-sidebar-accent"
                        aria-label="Toggle sidebar"
                        variant="outline"
                    >
                        {/* {(state === "expanded" || isMobile) ? (
                            <icons.x className="size-5 transition-transform duration-200" />
                        ) : (
                            <icons.ellipsis className="size-5 transition-transform duration-200" />
                        )} */}

                        <icons.sidebarToggle className="size-5 transition-transform duration-200" />
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent className="py-4 bg-white">
                {sidebarGroups.map((group, index) => (
                    <Collapsible key={index} defaultOpen className="group/collapsible ">

                        <SidebarGroup>
                            <SidebarGroupLabel asChild >
                                <CollapsibleTrigger className="text-xs uppercase hover:bg-accent text-gray-600 mb-1">
                                    {group.label}
                                    <icons.chevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenu className={cn("relative space-y-0.5", state === "expanded" && "pl-3")}>
                                    {
                                        state === "expanded" &&
                                        <div className="absolute left-2 top-0 h-full w-px bg-sidebar-ring" />
                                    }
                                    {group.items.map((item) => (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton asChild tooltip={item.label} isActive={pathname === item.href}>

                                                <LinkTag href={item.href} variant="custom" className="flex items-center py-5 text-gray-700">
                                                    <item.icon className="size-8" />
                                                    <Text as="span" size="sm" className="font-normal">{item.label}</Text>

                                                </LinkTag>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>


        </Sidebar >
    );
}