import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
import { AppSidebar } from "@/components/app-sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
