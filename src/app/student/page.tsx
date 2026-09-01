"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Home,
  Menu,
  MessageCircle,
  PanelRightOpen,
  Plus,
  SlidersHorizontal,
  Star,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { AdCarousel, type AdSlide } from "@/components/library/ad-carousel";
import { FloatingDock, type DockItem } from "@/components/library/floating-dock";
import { GooeyInput } from "@/components/library/gooey-input";
import { SlidingNumber } from "@/components/library/sliding-number";
import { StatefulButton } from "@/components/library/stateful-button";
import { TextMorph } from "@/components/library/text-morph";
import { cn } from "@/lib/utils";

/* ---------------- Mock data ---------------- */

const student = {
  firstName: "Sara",
  fullName: "Sara Bencheikh",
  level: "Terminale S · Lycée Descartes",
  initials: "SB",
};

const trending = [
  {
    subject: "Mathématiques",
    title: "Bac 2026 · Analyse & suites numériques",
    teacher: { name: "Youssef Amrani", initials: "YA" },
    rating: 4.9,
    sessionsGiven: 342,
    price: 220,
    nextSlot: "Ce soir · 20:00",
    tone: "soft-blue" as const,
  },
  {
    subject: "Physique-Chimie",
    title: "Bac · Mécanique du solide & énergétique",
    teacher: { name: "Nadia Cherkaoui", initials: "NC" },
    rating: 4.8,
    sessionsGiven: 182,
    price: 200,
    nextSlot: "Demain · 18:00",
    tone: "cream" as const,
  },
  {
    subject: "Français",
    title: "DELF B2 · essai argumenté pour la fac",
    teacher: { name: "Marc Dupont", initials: "MD" },
    rating: 5.0,
    sessionsGiven: 96,
    price: 250,
    nextSlot: "Jeu. · 17:30",
    tone: "lime" as const,
  },
];

const upcoming = [
  { when: "Aujourd'hui · 17:00", title: "Analyse — dérivées & fonction composée", teacher: "Youssef Amrani", duration: "60 min", dot: "#C4CFFF", joinable: true },
  { when: "Aujourd'hui · 19:30", title: "DELF B2 — essai argumenté", teacher: "Marc Dupont", duration: "45 min", dot: "#DFFF3F", joinable: false },
  { when: "Demain · 16:00", title: "Physique — mécanique du solide", teacher: "Nadia Cherkaoui", duration: "90 min", dot: "#F0EDE4", joinable: false },
];

const openRequest = { title: "Bac SVT · révision génétique en 2 semaines", postedAgo: "publiée il y a 2 jours" };

const applicants = [
  { name: "Karim El Fassi", initials: "KE", subject: "SVT · 6 ans d'exp.", rating: 4.9, price: 140 },
  { name: "Leila Bennani", initials: "LB", subject: "SVT · 4 ans d'exp.", rating: 4.8, price: 120 },
  { name: "Omar Zerouali", initials: "OZ", subject: "SVT · 9 ans d'exp.", rating: 5.0, price: 200 },
];

const messages = [
  { name: "Youssef Amrani", initials: "YA", preview: "Voici la fiche d'exercices pour ce soir 📄", time: "5 min", unread: true },
  { name: "Marc Dupont", initials: "MD", preview: "On peut décaler la séance de 15 min ?", time: "1 h", unread: true },
  { name: "Nadia Cherkaoui", initials: "NC", preview: "Bravo pour ton dernier DS 👏", time: "3 h", unread: false },
];

const monthlyStats = { sessions: 12, teachers: 3, hours: 18 };
const nextSessionIn = "4 h 12 min";

const appAds: AdSlide[] = [
  {
    id: "post",
    eyebrow: "Nouveau sur darso",
    title: "Poste une demande,",
    accent: "les profs postulent.",
    body: "Style Upwork — reçois 3 à 5 propositions en moins d'1 h.",
    cta: "Essayer",
    bg: "linear-gradient(135deg, #0B0B0F 0%, #1E1F27 100%)",
    fg: "light",
  },
  {
    id: "verified",
    eyebrow: "240+ profs vérifiés",
    title: "Prépare ton Bac",
    accent: "avec les meilleurs.",
    body: "Diplômes contrôlés, avis publics, satisfaction 4.8★ en moyenne.",
    cta: "Découvrir",
    bg: "linear-gradient(135deg, #DFFF3F 0%, #C4E029 100%)",
    fg: "dark",
  },
  {
    id: "referral",
    eyebrow: "Parrainage",
    title: "Invite un ami,",
    accent: "gagnez 100 MAD chacun.",
    body: "Crédit valable sur toutes tes prochaines séances.",
    cta: "Parrainer",
    bg: "linear-gradient(135deg, #C4CFFF 0%, #A6B4FF 100%)",
    fg: "dark",
  },
];

const primaryNav = [
  { icon: Home, label: "Accueil", active: true },
  { icon: GraduationCap, label: "Découvrir" },
  { icon: Bookmark, label: "Favoris" },
  { icon: Calendar, label: "Mes séances" },
  { icon: CreditCard, label: "Paiements" },
  { icon: Star, label: "Avis" },
  { icon: MessageCircle, label: "Messages", badge: 2 },
];
const secondaryNav = [
  { icon: Bell, label: "Notifications", badge: 4 },
  { icon: HelpCircle, label: "Aide" },
  { icon: User, label: "Profil" },
];
const mobileTabs = [
  { icon: Home, label: "Accueil", active: true },
  { icon: GraduationCap, label: "Découvrir" },
  { icon: Calendar, label: "Séances" },
  { icon: MessageCircle, label: "Messages", badge: 2 },
  { icon: User, label: "Profil" },
];

const springSoft = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.6 };

/* ---------------- Page — dual layout, CSS-gated so no hydration flash ---------------- */

export default function StudentDashboardPage() {
  return (
    <>
      <div className="hidden min-[900px]:block">
        <DesktopDashboard />
      </div>
      <div className="min-[900px]:hidden">
        <MobileDashboard />
      </div>
    </>
  );
}

/* ================================================================
   DESKTOP
   ================================================================ */

function DesktopDashboard() {
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

  return (
    <div className="min-h-dvh bg-[#EDEDEF] p-2.5">
      <div className="mx-auto flex h-[calc(100dvh-1.25rem)] max-w-[1600px] gap-2.5">
        <Sidebar collapsed={leftCollapsed} onToggle={() => setLeftCollapsed((v) => !v)} />

        <div className="relative flex min-w-0 flex-1 gap-2.5">
          <MainDesktop railOpen={rightOpen} onOpenRail={() => setRightOpen(true)} />
          <AnimatePresence initial={false}>
            {rightOpen ? (
              <motion.aside
                key="rail"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 304, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={springSoft}
                className="shrink-0 overflow-hidden"
              >
                <div className="scrollbar-none flex h-full w-[304px] flex-col gap-2.5 overflow-y-auto py-1">
                  <RightRail onClose={() => setRightOpen(false)} />
                </div>
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 208 }}
      transition={springSoft}
      className="flex shrink-0 flex-col rounded-[20px] bg-white p-3 shadow-[0_1px_2px_rgba(10,11,20,0.04)]"
    >
      <div className="mb-5 flex items-center gap-2 px-1 pt-0.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#0B0B0F]">
          <Logo mark className="!text-[19px] !text-[#DFFF3F]" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-1 items-center justify-between overflow-hidden"
            >
              <Logo className="!text-[21px]" />
              <button onClick={onToggle} aria-label="Réduire le menu" className="ml-1 grid h-6 w-6 place-items-center rounded-md text-[#8A8D93] transition-colors hover:bg-[#F5F5F7] hover:text-[#0B0B0F]">
                <ChevronsLeft className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {collapsed ? (
        <button onClick={onToggle} aria-label="Déployer le menu" className="mb-2 grid h-8 place-items-center rounded-lg text-[#8A8D93] transition-colors hover:bg-[#F5F5F7] hover:text-[#0B0B0F]">
          <ChevronsRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      ) : null}

      <nav className="flex flex-1 flex-col gap-0.5">
        <NavGroup label="Apprendre" collapsed={collapsed}>
          {primaryNav.map((item) => (
            <NavItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </NavGroup>
        <div className="h-4" />
        <NavGroup label="Compte" collapsed={collapsed}>
          {secondaryNav.map((item) => (
            <NavItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </NavGroup>
      </nav>

      <div className={cn("mt-3 flex items-center gap-2.5 rounded-xl border border-[#EFEFF1] p-2", collapsed && "justify-center")}>
        <Avatar initials={student.initials} tone="brand" size={collapsed ? 30 : 34} />
        <AnimatePresence initial={false}>
          {!collapsed ? (
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.15 }} className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-[12.5px] font-semibold text-[#0B0B0F]">{student.fullName}</p>
              <p className="truncate text-[10.5px] text-[#8A8D93]">{student.level}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

function NavGroup({ label, collapsed, children }: { label: string; collapsed: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }} className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#B0B3B8]">
            {label}
          </motion.p>
        ) : (
          <div className="mx-auto mb-1 h-px w-6 bg-[#EFEFF1]" />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

function NavItem({ icon: Icon, label, active, badge, collapsed, onClick }: { icon: React.ElementType; label: string; active?: boolean; badge?: number; collapsed: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] font-medium transition-colors",
        active ? "bg-[#0B0B0F] text-white" : "text-[#4A4D54] hover:bg-[#F5F5F7] hover:text-[#0B0B0F]",
        collapsed && "justify-center",
      )}
    >
      <Icon className="h-[16px] w-[16px] shrink-0" strokeWidth={1.75} />
      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.15 }} className="flex-1 overflow-hidden whitespace-nowrap text-left">
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
      {badge ? (
        collapsed ? (
          <span className="absolute right-1 top-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-[#DFFF3F] px-1 text-[9px] font-bold text-[#0B0B0F]">{badge}</span>
        ) : (
          <span className={cn("grid h-[18px] min-w-[18px] place-items-center rounded-full px-1.5 text-[10px] font-semibold", active ? "bg-[#DFFF3F] text-[#0B0B0F]" : "bg-[#F0F0F2] text-[#0B0B0F]")}>
            {badge}
          </span>
        )
      ) : null}
    </button>
  );
}

function MainDesktop({ onOpenRail, railOpen }: { onOpenRail: () => void; railOpen: boolean }) {
  return (
    <main className="scrollbar-none relative flex-1 overflow-y-auto rounded-[20px] bg-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
      <div className="p-6">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[12px] text-[#8A8D93]">
              <span>Mardi 1 septembre</span>
              <span className="h-1 w-1 rounded-full bg-[#D5D7DB]" />
              <span className="font-medium text-[#0B0B0F]">2 séances aujourd&apos;hui</span>
            </div>
            <h1 className="mt-1.5 font-[family-name:var(--font-cabinet)] text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-[#0B0B0F]">
              Bonjour, {student.firstName}
            </h1>
            <p className="mt-1.5 max-w-md text-[13px] text-[#6E7178]">
              {applicants.length} profs ont postulé à ta demande. Prochaine séance dans{" "}
              <span className="font-semibold text-[#0B0B0F]">{nextSessionIn}</span>.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <GooeyInput placeholder="Chercher un prof, une matière…" />
            <button aria-label="Calendrier" className="grid h-9 w-9 place-items-center rounded-full border border-[#EFEFF1] text-[#0B0B0F] transition-colors hover:bg-[#F5F5F7]">
              <Calendar className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button className="ml-0.5 flex h-9 items-center gap-1.5 rounded-full bg-[#0B0B0F] px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a1b21]">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
              Nouvelle demande
            </button>
            {!railOpen ? (
              <button onClick={onOpenRail} aria-label="Afficher le panneau" className="ml-0.5 grid h-9 w-9 place-items-center rounded-full border border-[#EFEFF1] text-[#0B0B0F] transition-colors hover:bg-[#F5F5F7]">
                <PanelRightOpen className="h-4 w-4" strokeWidth={1.75} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <AdCarousel slides={appAds} interval={5000} height={148} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <QuickAction tone="lime" eyebrow="Poste une demande" title="Besoin d'un prof précis ?" hoverTitle="Publie-la en 30 secondes" body="Décris ton objectif, laisse les profs postuler — style Upwork." />
          <QuickAction tone="dark" eyebrow="Parcourir" title="Trouve un prof par matière" hoverTitle="240+ profs vérifiés" body="Filtre par matière, tarif et disponibilité." />
        </div>

        <section className="mt-7">
          <SectionHeader title="Tendances de la semaine" subtitle="Les profs les plus réservés en Terminale S" action="Tout voir" />
          <div className="mt-3.5 grid grid-cols-3 gap-2.5">
            {trending.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </section>

        <section className="mt-7 pb-2">
          <SectionHeader title="Tes prochaines séances" action="Tout voir" />
          <div className="mt-3.5 divide-y divide-[#EFEFF1] overflow-hidden rounded-2xl border border-[#EFEFF1]">
            {upcoming.map((session) => (
              <SessionRow key={session.title} {...session} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ================================================================
   MOBILE — custom IA, horizontal-scroll sections, floating tab bar
   ================================================================ */

function MobileDashboard() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-[#EDEDEF] pb-28">
      <MobileHeader onOpenNav={() => setNavOpen(true)} />
      <MobileAds />
      <StatsStrip />
      <HeroGrid />
      <MobileTrending />
      <MobileApplications />
      <MobileMessages />
      <MobileMonthlyStat />
      <MobileTabBar />
      <AnimatePresence>
        {navOpen ? <MobileNavDrawer onClose={() => setNavOpen(false)} /> : null}
      </AnimatePresence>
    </div>
  );
}

function MobileHeader({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="sticky top-0 z-20 bg-[#EDEDEF]/90 px-4 pb-3 pt-6 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0B0B0F]">
            <Logo mark className="!text-[22px] !text-[#DFFF3F]" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-cabinet)] text-[17px] font-bold leading-none tracking-tight text-[#0B0B0F]">
              Bonjour, {student.firstName}
            </p>
            <p className="mt-1 truncate text-[10.5px] text-[#8A8D93]">
              Mar. 1 sept. · 2 séances aujourd&apos;hui
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button aria-label="Favoris" className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0B0B0F] shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
            <Bookmark className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </button>
          <button
            onClick={onOpenNav}
            aria-label="Ouvrir le menu"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#0B0B0F] shadow-[0_1px_2px_rgba(10,11,20,0.04)]"
          >
            <Menu className="h-[17px] w-[17px]" strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#DFFF3F]" />
          </button>
          <button aria-label="Profil" className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Avatar initials={student.initials} tone="brand" size={40} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileAds() {
  return (
    <div className="mt-2 px-4">
      <AdCarousel slides={appAds} interval={5000} height={128} />
    </div>
  );
}

function MobileNavDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[#0B0B0F]/40"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={springSoft}
        onClick={(e) => e.stopPropagation()}
        className="scrollbar-none absolute inset-y-0 right-0 flex w-[280px] max-w-[86vw] flex-col overflow-y-auto bg-white p-4 shadow-[-8px_0_40px_-12px_rgba(10,11,20,0.25)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#0B0B0F]">
              <Logo mark className="!text-[20px] !text-[#DFFF3F]" />
            </div>
            <Logo className="!text-[22px]" />
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="grid h-8 w-8 place-items-center rounded-md text-[#8A8D93] transition-colors hover:bg-[#F5F5F7] hover:text-[#0B0B0F]"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5">
          <NavGroup label="Apprendre" collapsed={false}>
            {primaryNav.map((item) => (
              <NavItem key={item.label} {...item} collapsed={false} onClick={onClose} />
            ))}
          </NavGroup>
          <div className="h-4" />
          <NavGroup label="Compte" collapsed={false}>
            {secondaryNav.map((item) => (
              <NavItem key={item.label} {...item} collapsed={false} onClick={onClose} />
            ))}
          </NavGroup>
        </nav>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#EFEFF1] p-2">
          <Avatar initials={student.initials} tone="brand" size={34} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#0B0B0F]">{student.fullName}</p>
            <p className="truncate text-[10.5px] text-[#8A8D93]">{student.level}</p>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function StatsStrip() {
  const stats = [
    { icon: Clock, value: nextSessionIn, label: "avant la séance", accent: true },
    { icon: Calendar, value: "18 h", label: "ce mois", accent: false },
    { icon: GraduationCap, value: "12", label: "séances", accent: false },
    { icon: User, value: "3", label: "profs", accent: false },
  ];
  return (
    <div
      className="scrollbar-none mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1"
      style={{ scrollPaddingInline: "1rem" }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2",
            s.accent ? "border-transparent bg-[#0B0B0F] text-white" : "border-[#EFEFF1] bg-white text-[#0B0B0F]",
          )}
        >
          <s.icon className={cn("h-3.5 w-3.5", s.accent ? "text-[#DFFF3F]" : "text-[#8A8D93]")} strokeWidth={1.75} />
          <span className="text-[12.5px] font-bold">{s.value}</span>
          <span className={cn("text-[11px]", s.accent ? "text-white/60" : "text-[#8A8D93]")}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function HeroGrid() {
  const s = upcoming[0];
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 px-4">
      {/* Imminent session — dark card, subject-color accent */}
      <div className="relative flex flex-col overflow-hidden rounded-[18px] bg-[#0B0B0F] p-3.5 text-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <span
          className="absolute left-3.5 top-3.5 h-1.5 w-6 rounded-full"
          style={{ backgroundColor: s.dot }}
        />
        <p className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">
          Prochaine · dans {nextSessionIn}
        </p>
        <p className="mt-1 font-[family-name:var(--font-cabinet)] text-[16px] font-bold leading-[1.15] tracking-tight text-white line-clamp-2">
          {s.title}
        </p>
        <p className="mt-1 truncate text-[10.5px] text-white/50">
          {s.teacher.split(" ")[0]} · {s.duration}
        </p>
        <div className="mt-auto pt-3">
          <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#DFFF3F] py-1.5 text-[11.5px] font-semibold text-[#0B0B0F]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0B0B0F]" />
            Rejoindre
          </button>
        </div>
      </div>

      {/* Post a request — lime card */}
      <button className="group relative flex flex-col overflow-hidden rounded-[18px] bg-[#DFFF3F] p-3.5 text-left text-[#0B0B0F]">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-[#0B0B0F]/60">
          Poste une demande
        </p>
        <p className="mt-1 font-[family-name:var(--font-cabinet)] text-[16px] font-bold leading-[1.15] tracking-tight">
          Besoin d&apos;un prof précis ?
        </p>
        <p className="mt-1 text-[10.5px] leading-snug text-[#0B0B0F]/70 line-clamp-2">
          Décris ton objectif, laisse les profs postuler.
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[10.5px] font-semibold text-[#0B0B0F]">Style Upwork</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B0B0F] text-white transition-transform group-hover:rotate-45">
            <Plus className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </div>
  );
}

function MobileTrending() {
  return (
    <section className="mt-5">
      <div className="flex items-end justify-between px-4">
        <div>
          <h2 className="font-[family-name:var(--font-cabinet)] text-[17px] font-bold tracking-tight text-[#0B0B0F]">
            Tendances de la semaine
          </h2>
          <p className="mt-0.5 text-[11px] text-[#8A8D93]">Les plus réservés en Terminale S</p>
        </div>
        <button className="flex items-center gap-1 text-[11.5px] font-medium text-[#8A8D93]">
          <SlidersHorizontal className="h-3 w-3" strokeWidth={2} />
          Filtrer
        </button>
      </div>
      <div
        className="scrollbar-none mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
        style={{ scrollPaddingInline: "1rem" }}
      >
        {trending.map((course) => (
          <div key={course.title} className="w-[74vw] max-w-[280px] shrink-0 snap-start">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileApplications() {
  return (
    <section className="mt-5 px-4">
      <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#0B0B0F]">Candidatures en attente</h3>
          <span className="rounded-full bg-[#DFFF3F] px-1.5 py-0.5 text-[10px] font-semibold text-[#0B0B0F]">
            {applicants.length} nouvelles
          </span>
        </div>
        <div className="mt-2 rounded-md bg-[#F5F5F7] p-2">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-[#8A8D93]">Ta demande</p>
          <p className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B0B0F]">{openRequest.title}</p>
        </div>
        <div className="mt-3 space-y-3">
          {applicants.map((a) => (
            <Applicant key={a.name} {...a} />
          ))}
        </div>
        <button className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0B0B0F] py-2.5 text-[12px] font-semibold text-white">
          Voir les {applicants.length} candidatures
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

function MobileMessages() {
  return (
    <section className="mt-3 px-4">
      <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#0B0B0F]">Messages</h3>
          <button className="text-[10.5px] font-medium text-[#8A8D93]">Boîte de réception</button>
        </div>
        <div className="mt-3 space-y-3">
          {messages.map((m) => (
            <MessagePreview key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileMonthlyStat() {
  return (
    <section className="mt-3 px-4">
      <div className="rounded-[20px] bg-[#0B0B0F] p-4 text-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">Septembre en cours</span>
          <span className="flex h-5 items-center gap-1 rounded-full bg-white/10 px-1.5 text-[9.5px] font-semibold text-[#DFFF3F]">
            <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
            dans les temps
          </span>
        </div>
        <div className="mt-2.5 flex items-end justify-between">
          <div>
            <div className="font-[family-name:var(--font-cabinet)] text-[36px] font-bold leading-none tracking-tight">
              <SlidingNumber value={monthlyStats.hours} />
              <span className="text-[15px] font-semibold text-white/50"> h</span>
            </div>
            <p className="mt-1 text-[11px] text-white/60">
              {monthlyStats.sessions} séances · {monthlyStats.teachers} profs
            </p>
          </div>
          <div className="flex items-end gap-1">
            {[35, 55, 30, 70, 45, 90, 60].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={cn("w-3 rounded-sm", i === 5 ? "bg-[#DFFF3F]" : "bg-white/15")} style={{ height: `${h * 0.5}px` }} />
                <span className="text-[8.5px] font-medium text-white/40">{["L", "M", "M", "J", "V", "S", "D"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileTabBar() {
  const dockItems: DockItem[] = mobileTabs.map((t) => ({
    title: t.label,
    icon: <t.icon className="h-full w-full" strokeWidth={1.75} />,
    active: t.active,
    badge: t.badge,
  }));

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2">
      <FloatingDock items={dockItems} variant="dock" />
    </div>
  );
}

/* ================================================================
   SHARED PIECES
   ================================================================ */

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <h2 className="font-[family-name:var(--font-cabinet)] text-[18px] font-bold tracking-tight text-[#0B0B0F]">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-[11.5px] text-[#8A8D93]">{subtitle}</p> : null}
      </div>
      {action ? (
        <button className="shrink-0 text-[11.5px] font-medium text-[#8A8D93] transition-colors hover:text-[#0B0B0F]">{action}</button>
      ) : null}
    </div>
  );
}

function QuickAction({ tone, eyebrow, title, hoverTitle, body }: { tone: "lime" | "dark"; eyebrow: string; title: string; hoverTitle: string; body: string }) {
  const isLime = tone === "lime";
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn("group relative flex h-[148px] flex-col justify-between overflow-hidden rounded-[18px] p-4 text-left transition-transform hover:-translate-y-0.5", isLime ? "bg-[#DFFF3F] text-[#0B0B0F]" : "bg-[#0B0B0F] text-white")}
    >
      <div>
        <p className={cn("text-[10px] font-semibold uppercase tracking-[0.09em]", isLime ? "text-[#0B0B0F]/60" : "text-white/50")}>{eyebrow}</p>
        <p className="mt-1.5 font-[family-name:var(--font-cabinet)] text-[19px] font-bold leading-[1.15] tracking-tight">
          <TextMorph>{hover ? hoverTitle : title}</TextMorph>
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p className={cn("max-w-[190px] text-[11.5px] leading-snug", isLime ? "text-[#0B0B0F]/70" : "text-white/60")}>{body}</p>
        <span className={cn("grid h-8 w-8 place-items-center rounded-full transition-transform group-hover:rotate-45", isLime ? "bg-[#0B0B0F] text-white" : "bg-white text-[#0B0B0F]")}>
          {isLime ? <Plus className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
        </span>
      </div>
    </button>
  );
}

function CourseCard({ subject, title, teacher, rating, sessionsGiven, price, nextSlot, tone }: {
  subject: string; title: string; teacher: { name: string; initials: string }; rating: number; sessionsGiven: number; price: number; nextSlot: string; tone: "lime" | "soft-blue" | "cream";
}) {
  const toneBg = { lime: "bg-[#DFFF3F]", "soft-blue": "bg-[#C4CFFF]", cream: "bg-[#F0EDE4]" }[tone];
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] border border-[#EFEFF1] bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(10,11,20,0.06)]">
      <div className={cn("relative h-20", toneBg)}>
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-semibold text-[#0B0B0F]">{subject}</span>
        <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#0B0B0F] px-1.5 py-0.5 text-[10.5px] font-semibold text-white">
          <Star className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
          {rating.toFixed(1)}
        </span>
        <button aria-label="Bookmark" className="absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[#0B0B0F]">
          <Bookmark className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[13px] font-semibold leading-snug text-[#0B0B0F]">{title}</h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Avatar initials={teacher.initials} tone="neutral" size={18} />
          <p className="truncate text-[11px] text-[#6E7178]">{teacher.name} · {sessionsGiven} séances</p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#EFEFF1] pt-2.5">
          <div>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#B0B3B8]">Prochain créneau</p>
            <p className="text-[11px] font-semibold text-[#0B0B0F]">{nextSlot}</p>
          </div>
          <div className="text-right">
            <p className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#B0B3B8]">À partir de</p>
            <p className="text-[12px] font-bold text-[#0B0B0F]">
              {price} <span className="text-[9.5px] font-medium text-[#8A8D93]">MAD/h</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SessionRow({ when, title, teacher, duration, dot, joinable }: { when: string; title: string; teacher: string; duration: string; dot: string; joinable: boolean }) {
  return (
    <div className="flex items-center gap-3.5 p-3.5">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#F5F5F7]">
        <Calendar className="h-4 w-4 text-[#0B0B0F]" strokeWidth={1.75} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ backgroundColor: dot }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A8D93]">{when}</p>
        <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0B0B0F]">{title}</p>
        <p className="truncate text-[11px] text-[#8A8D93]">avec {teacher} · {duration}</p>
      </div>
      {joinable ? (
        <StatefulButton>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0B0B0F]" />
            Rejoindre
          </span>
        </StatefulButton>
      ) : (
        <button className="rounded-full border border-[#EFEFF1] px-3 py-1.5 text-[11.5px] font-semibold text-[#0B0B0F]">Détails</button>
      )}
    </div>
  );
}

function RightRail({ onClose }: { onClose?: () => void }) {
  return (
    <>
      <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#0B0B0F]">Candidatures en attente</h3>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[#DFFF3F] px-1.5 py-0.5 text-[10px] font-semibold text-[#0B0B0F]">{applicants.length} nouvelles</span>
            {onClose ? (
              <button onClick={onClose} aria-label="Réduire le panneau" className="grid h-6 w-6 place-items-center rounded-md text-[#8A8D93] transition-colors hover:bg-[#F5F5F7] hover:text-[#0B0B0F]">
                <ChevronsRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            ) : null}
          </div>
        </div>
        <div className="mt-2 rounded-md bg-[#F5F5F7] p-2">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-[#8A8D93]">Ta demande</p>
          <p className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B0B0F]">{openRequest.title}</p>
          <p className="text-[10px] text-[#8A8D93]">{openRequest.postedAgo}</p>
        </div>
        <div className="mt-3 space-y-3">
          {applicants.map((a) => (
            <Applicant key={a.name} {...a} />
          ))}
        </div>
        <button className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0B0B0F] py-2 text-[11.5px] font-semibold text-white">
          Voir les {applicants.length} candidatures
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#0B0B0F]">Messages</h3>
          <button className="text-[10.5px] font-medium text-[#8A8D93]">Boîte de réception</button>
        </div>
        <div className="mt-3 space-y-3">
          {messages.map((m) => (
            <MessagePreview key={m.name} {...m} />
          ))}
        </div>
      </div>

      <div className="rounded-[20px] bg-[#0B0B0F] p-4 text-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">Septembre en cours</span>
          <span className="flex h-5 items-center gap-1 rounded-full bg-white/10 px-1.5 text-[9.5px] font-semibold text-[#DFFF3F]">
            <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
            dans les temps
          </span>
        </div>
        <div className="mt-2.5 font-[family-name:var(--font-cabinet)] text-[34px] font-bold leading-none tracking-tight">
          <SlidingNumber value={monthlyStats.hours} />
          <span className="text-[15px] font-semibold text-white/50"> h</span>
        </div>
        <p className="mt-1 text-[11px] text-white/60">
          en {monthlyStats.sessions} séances avec {monthlyStats.teachers} profs
        </p>
        <div className="mt-3.5 flex items-end gap-1">
          {[35, 55, 30, 70, 45, 90, 60].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className={cn("w-full rounded-sm", i === 5 ? "bg-[#DFFF3F]" : "bg-white/15")} style={{ height: `${h * 0.45}px` }} />
              <span className="text-[8.5px] font-medium text-white/40">{["L", "M", "M", "J", "V", "S", "D"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Applicant({ name, initials, subject, rating, price }: { name: string; initials: string; subject: string; rating: number; price: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={initials} tone="neutral" size={32} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold text-[#0B0B0F]">{name}</p>
        <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#8A8D93]">
          <Star className="h-2.5 w-2.5 fill-[#0B0B0F] text-[#0B0B0F]" strokeWidth={0} />
          <span className="font-semibold text-[#0B0B0F]">{rating.toFixed(1)}</span>
          <span>·</span>
          <span className="truncate">{subject}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-bold text-[#0B0B0F]">{price}</p>
        <p className="text-[9px] font-medium text-[#8A8D93]">MAD/h</p>
      </div>
    </div>
  );
}

function MessagePreview({ name, initials, preview, time, unread }: { name: string; initials: string; preview: string; time: string; unread: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="relative shrink-0">
        <Avatar initials={initials} tone="neutral" size={32} />
        {unread ? <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#DFFF3F]" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[12px] font-semibold text-[#0B0B0F]">{name}</p>
          <span className="shrink-0 text-[10px] text-[#8A8D93]">{time}</span>
        </div>
        <p className={cn("truncate text-[11px]", unread ? "font-medium text-[#0B0B0F]" : "text-[#8A8D93]")}>{preview}</p>
      </div>
    </div>
  );
}

function Avatar({ initials, tone = "neutral", size = 32 }: { initials: string; tone?: "neutral" | "brand"; size?: number }) {
  const palette = tone === "brand" ? "bg-[#0B0B0F] text-[#DFFF3F]" : "bg-[#F0F0F2] text-[#0B0B0F]";
  const fontSize = Math.max(9, Math.round(size * 0.36));
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-full font-semibold", palette)} style={{ width: size, height: size, fontSize }}>
      {initials}
    </div>
  );
}
