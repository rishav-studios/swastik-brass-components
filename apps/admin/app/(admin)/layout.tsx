import { SidebarProvider } from "@swastik/ui/components/shadcn/sidebar"
import AppSidebar from "@/components/layout/AppSidebar"
import Navbar from "@/components/layout/Navbar"


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
                <div className='p-4'>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}