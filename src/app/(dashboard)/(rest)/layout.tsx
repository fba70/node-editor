import React from "react"
import { AppHeader } from "@/components/app-header"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}

export default DashboardLayout
