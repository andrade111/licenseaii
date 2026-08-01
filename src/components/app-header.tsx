import { Bell, ChevronsUpDown, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProject } from "@/context/project-context";

export function AppHeader() {
  const { projects, project, setProjectId } = useProject();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card/85 px-3 backdrop-blur">
      <SidebarTrigger />
      <img
        src="/logo-licenseai.png"
        alt="LicenseAI"
        className="hidden size-7 rounded-lg object-contain md:block"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 max-w-[340px] justify-between gap-2 rounded-lg shadow-sm">
            <span className="truncate text-xs font-medium">
              {project.name} / {project.uf}
            </span>
            <ChevronsUpDown className="size-3.5 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-80">
          <DropdownMenuLabel className="text-xs">Projetos ativos</DropdownMenuLabel>
          {projects.map((p) => (
            <DropdownMenuItem
              key={p.id}
              onSelect={() => setProjectId(p.id)}
              className="text-xs"
            >
              <span className="truncate">{p.name}</span>
              <span className="ml-auto text-muted-foreground">{p.uf}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Buscar processo">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Alertas" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
        </Button>
        <div className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 shadow-sm">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-[11px] text-primary-foreground">MC</AvatarFallback>
          </Avatar>
          <span className="hidden text-xs leading-tight sm:block">
            <span className="block font-medium">Marina Coutinho</span>
            <span className="block text-[11px] text-muted-foreground">Gerência de Licenciamento</span>
          </span>
        </div>
      </div>
    </header>
  );
}
