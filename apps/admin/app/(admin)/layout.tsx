import AppSidebar from "@/components/layout/AppSidebar"
import Navbar from "@/components/layout/Navbar"
import { SidebarProvider } from "@swastik/ui/components/shadcn/sidebar"
import { Toaster } from "@swastik/ui/components/shadcn/sonner"


export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {


    return (

        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-full">
                <Navbar />
                <div className='p-4 pt-0 mt-20'>
                    {children}
                </div>
            </div>
            <Toaster position="top-center" />
        </SidebarProvider>
    )
}