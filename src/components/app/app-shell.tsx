"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { springSoft } from "@/lib/motion";
import type { NavConfig, TabConfig } from "@/lib/nav";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { MobileTabBar } from "./mobile-tab-bar";

export type AppShellUser = {
  fullName: string;
  level?: string;
  initials: string;
};

type AppShellCtx = {
  railOpen: boolean;
  setRailOpen: (v: boolean) => void;
  openRail: () => void;
  closeRail: () => void;
};

const AppShellContext = createContext<AppShellCtx | null>(null);

export function useAppShell(): AppShellCtx {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error("useAppShell must be used inside <AppShell>");
  return ctx;
}

export function AppShell({
  nav,
  mobileTabs,
  user,
  desktopMain,
  rail,
  mobileHeader,
  mobileChildren,
}: {
  nav: NavConfig;
  mobileTabs: TabConfig[];
  user: AppShellUser;
  desktopMain: React.ReactNode;
  rail?: React.ReactNode;
  mobileHeader: { title: string; subtitle?: string; right?: React.ReactNode };
  mobileChildren: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden min-[900px]:block">
        <DesktopFrame nav={nav} user={user} rail={rail}>
          {desktopMain}
        </DesktopFrame>
      </div>
      <div className="min-[900px]:hidden">
        <MobileFrame nav={nav} user={user} mobileTabs={mobileTabs} header={mobileHeader}>
          {mobileChildren}
        </MobileFrame>
      </div>
    </>
  );
}

function DesktopFrame({
  nav,
  user,
  rail,
  children,
}: {
  nav: NavConfig;
  user: AppShellUser;
  rail?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightOpen, setRightOpen] = useState(true);
  const [isTabletBP, setIsTabletBP] = useState(false);

  useEffect(() => {
    const compute = () => setIsTabletBP(window.innerWidth < 1180);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    setLeftCollapsed(isTabletBP);
  }, [isTabletBP]);

  const ctxValue: AppShellCtx = {
    railOpen: rightOpen,
    setRailOpen: setRightOpen,
    openRail: () => setRightOpen(true),
    closeRail: () => setRightOpen(false),
  };

  return (
    <AppShellContext.Provider value={ctxValue}>
      <div className="min-h-dvh bg-[#EDEDEF] p-2.5">
        <div className="mx-auto flex h-[calc(100dvh-1.25rem)] max-w-[1600px] gap-2.5">
          <Sidebar
            collapsed={leftCollapsed}
            onToggle={() => setLeftCollapsed((v) => !v)}
            nav={nav}
            user={user}
          />

          <div className="relative flex min-w-0 flex-1 gap-2.5">
            <main className="scrollbar-none relative flex-1 overflow-y-auto rounded-[20px] bg-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
              {children}
            </main>
            <AnimatePresence initial={false}>
              {rail && rightOpen ? (
                <motion.aside
                  key="rail"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 304, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={springSoft}
                  className="shrink-0 overflow-hidden"
                >
                  <div className="scrollbar-none flex h-full w-[304px] flex-col gap-2.5 overflow-y-auto py-1">
                    {rail}
                  </div>
                </motion.aside>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}

function MobileFrame({
  nav,
  user,
  mobileTabs,
  header,
  children,
}: {
  nav: NavConfig;
  user: AppShellUser;
  mobileTabs: TabConfig[];
  header: { title: string; subtitle?: string; right?: React.ReactNode };
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-[#EDEDEF] pb-28">
      <MobileHeader
        title={header.title}
        subtitle={header.subtitle}
        right={header.right}
        user={{ initials: user.initials }}
        onOpenNav={() => setNavOpen(true)}
      />
      {children}
      <MobileTabBar tabs={mobileTabs} />
      <AnimatePresence>
        {navOpen ? (
          <MobileNavDrawer nav={nav} user={user} onClose={() => setNavOpen(false)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
