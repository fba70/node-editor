"use client"

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription"

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Workflows", url: "/workflows", icon: FolderOpenIcon },
      { title: "Credentials", url: "/credentials", icon: KeyIcon },
      { title: "Executions", url: "/executions", icon: HistoryIcon },
    ],
  },
]

export const AppSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image src="/logo.svg" alt="Workflows" width={30} height={30} />
              <p className="font-semibold text-orange-600">NODE EDITOR</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-x-4 h-10"
                        prefetch
                      >
                        <item.icon className="size-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!isLoading && !hasActiveSubscription && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to PRO"
                onClick={() => authClient.checkout({ slug: "pro" })}
                className="gap-x-4 h-10 px-4"
              >
                <StarIcon size={4} />
                <p>Upgrade to PRO</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing portal"
              onClick={() => authClient.customer.portal()}
              className="gap-x-4 h-10 px-4"
            >
              <CreditCardIcon size={4} />
              <p>Billing Portal</p>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in")
                      router.refresh()
                    },
                  },
                })
              }
              className="gap-x-4 h-10 px-4"
            >
              <LogOutIcon size={4} />
              <p>Sign Out</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
