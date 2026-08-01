import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Grid3x3, BotMessageSquare, KanbanSquare } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Matriz de Requisitos", url: "/matriz", icon: Grid3x3 },
  { title: "Bot Validador", url: "/bot", icon: BotMessageSquare },
  { title: "Kanban Interorgânico", url: "/kanban", icon: KanbanSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-1 py-1.5">
          <img
            src="/logo-licenseai.png"
            alt="Logo LicenseAI"
            className="size-8 shrink-0 rounded-lg bg-sidebar-accent object-contain p-0.5"
          />
          {!collapsed && (
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold">
                License<span className="text-sidebar-primary">AI</span>
              </span>
              <span className="text-[11px] text-sidebar-foreground/60">Compliance minerário</span>
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={path === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter>
          <p className="px-2 pb-1 text-[11px] leading-snug text-sidebar-foreground/55">
            Base normativa atualizada em 01/08/2026 · ANM, SEMAD-MG, SEMAS-PA, INEMA-BA
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
