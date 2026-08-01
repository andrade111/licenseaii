import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { PROJECTS, type ProjectContextData } from "@/data/projects";

type Ctx = {
  projects: ProjectContextData[];
  project: ProjectContextData;
  setProjectId: (id: string) => void;
};

const ProjectCtx = createContext<Ctx | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [id, setProjectId] = useState(PROJECTS[0]!.id);
  const value = useMemo<Ctx>(
    () => ({
      projects: PROJECTS,
      project: PROJECTS.find((p) => p.id === id) ?? PROJECTS[0]!,
      setProjectId,
    }),
    [id],
  );
  return <ProjectCtx.Provider value={value}>{children}</ProjectCtx.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectCtx);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
