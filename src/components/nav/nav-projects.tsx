"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden bg-transparent">
      <SidebarGroupLabel className="text-white/90">Projects</SidebarGroupLabel>
      <SidebarMenu className="bg-transparent">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className="bg-transparent">
            <SidebarMenuButton asChild className="bg-transparent text-white hover:bg-white/10">
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover className="bg-transparent text-white hover:bg-white/10">
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              {/* Keep your existing DropdownMenuContent */}
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className="bg-transparent">
          <SidebarMenuButton className="bg-transparent text-white/70 hover:bg-white/10">
            <MoreHorizontal className="text-white/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
