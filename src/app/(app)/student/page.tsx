"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronsRight,
  Clock,
  GraduationCap,
  PanelRightOpen,
  Plus,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { AdCarousel, type AdSlide } from "@/components/library/ad-carousel";
import { GooeyInput } from "@/components/library/gooey-input";
import { SlidingNumber } from "@/components/library/sliding-number";
import { TextMorph } from "@/components/library/text-morph";
import { AppShell, useAppShell } from "@/components/app/app-shell";
import { Applicant } from "@/components/app/applicant";
import { CourseCard } from "@/components/app/course-card";
import { MessagePreview } from "@/components/app/message-preview";
import { PageHeader } from "@/components/app/page-header";
import { SectionHeader } from "@/components/app/section-header";
import { SessionRow } from "@/components/app/session-row";
import { studentMobileTabs, studentNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

/* ---------------- MOCK: replace when API lands ---------------- */

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

/* ---------------- Page ---------------- */

export default function StudentDashboardPage() {
  return (
    <AppShell
      nav={studentNav}
      mobileTabs={studentMobileTabs}
      user={student}
      desktopMain={<DesktopMain />}
      rail={<RightRail />}
      mobileHeader={{
        title: `Bonjour, ${student.firstName}`,
        subtitle: "Mar. 1 sept. · 2 séances aujourd'hui",
      }}
      mobileChildren={<MobileBody />}
    />
  );
}

/* ================================================================
   DESKTOP MAIN
   ================================================================ */

function DesktopMain() {
  const { railOpen, openRail } = useAppShell();
  return (
    <div className="p-6">
      <PageHeader
        eyebrow={
          <>
            <span>Mardi 1 septembre</span>
            <span className="h-1 w-1 rounded-full bg-[#D5D7DB]" />
            <span className="font-medium text-[#0B0B0F]">2 séances aujourd&apos;hui</span>
          </>
        }
        title={`Bonjour, ${student.firstName}`}
        subline={
          <>
            {applicants.length} profs ont postulé à ta demande. Prochaine séance dans{" "}
            <span className="font-semibold text-[#0B0B0F]">{nextSessionIn}</span>.
          </>
        }
        actions={
          <>
            <GooeyInput placeholder="Chercher un prof, une matière…" />
            <button
              aria-label="Calendrier"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#EFEFF1] text-[#0B0B0F] transition-colors hover:bg-[#F5F5F7]"
            >
              <Calendar className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button className="ml-0.5 flex h-9 items-center gap-1.5 rounded-full bg-[#0B0B0F] px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a1b21]">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
              Nouvelle demande
            </button>
            {!railOpen ? (
              <button
                onClick={openRail}
                aria-label="Afficher le panneau"
                className="ml-0.5 grid h-9 w-9 place-items-center rounded-full border border-[#EFEFF1] text-[#0B0B0F] transition-colors hover:bg-[#F5F5F7]"
              >
                <PanelRightOpen className="h-4 w-4" strokeWidth={1.75} />
              </button>
            ) : null}
          </>
        }
      />

      <div className="mt-6">
        <AdCarousel slides={appAds} interval={5000} height={148} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <QuickAction
          tone="lime"
          eyebrow="Poste une demande"
          title="Besoin d'un prof précis ?"
          hoverTitle="Publie-la en 30 secondes"
          body="Décris ton objectif, laisse les profs postuler — style Upwork."
        />
        <QuickAction
          tone="dark"
          eyebrow="Parcourir"
          title="Trouve un prof par matière"
          hoverTitle="240+ profs vérifiés"
          body="Filtre par matière, tarif et disponibilité."
        />
      </div>

      <section className="mt-7">
        <SectionHeader
          title="Tendances de la semaine"
          subtitle="Les profs les plus réservés en Terminale S"
          action="Tout voir"
        />
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
  );
}

function RightRail() {
  const { closeRail } = useAppShell();
  return (
    <>
      <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#0B0B0F]">Candidatures en attente</h3>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[#DFFF3F] px-1.5 py-0.5 text-[10px] font-semibold text-[#0B0B0F]">
              {applicants.length} nouvelles
            </span>
            <button
              onClick={closeRail}
              aria-label="Réduire le panneau"
              className="grid h-6 w-6 place-items-center rounded-md text-[#8A8D93] transition-colors hover:bg-[#F5F5F7] hover:text-[#0B0B0F]"
            >
              <ChevronsRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="mt-2 rounded-md bg-[#F5F5F7] p-2">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-[#8A8D93]">
            Ta demande
          </p>
          <p className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B0B0F]">
            {openRequest.title}
          </p>
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
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">
            Septembre en cours
          </span>
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
              <div
                className={cn("w-full rounded-sm", i === 5 ? "bg-[#DFFF3F]" : "bg-white/15")}
                style={{ height: `${h * 0.45}px` }}
              />
              <span className="text-[8.5px] font-medium text-white/40">
                {["L", "M", "M", "J", "V", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ================================================================
   MOBILE — custom IA, horizontal-scroll sections
   ================================================================ */

function MobileBody() {
  return (
    <>
      <MobileAds />
      <StatsStrip />
      <HeroGrid />
      <MobileTrending />
      <MobileApplications />
      <MobileMessages />
      <MobileMonthlyStat />
    </>
  );
}

function MobileAds() {
  return (
    <div className="mt-2 px-4">
      <AdCarousel slides={appAds} interval={5000} height={128} />
    </div>
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
            s.accent
              ? "border-transparent bg-[#0B0B0F] text-white"
              : "border-[#EFEFF1] bg-white text-[#0B0B0F]",
          )}
        >
          <s.icon
            className={cn("h-3.5 w-3.5", s.accent ? "text-[#DFFF3F]" : "text-[#8A8D93]")}
            strokeWidth={1.75}
          />
          <span className="text-[12.5px] font-bold">{s.value}</span>
          <span className={cn("text-[11px]", s.accent ? "text-white/60" : "text-[#8A8D93]")}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroGrid() {
  const s = upcoming[0];
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 px-4">
      <div className="relative flex flex-col overflow-hidden rounded-[18px] bg-[#0B0B0F] p-3.5 text-white shadow-[0_1px_2px_rgba(10,11,20,0.04)]">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">
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
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.07em] text-[#8A8D93]">
            Ta demande
          </p>
          <p className="mt-0.5 truncate text-[11.5px] font-semibold text-[#0B0B0F]">
            {openRequest.title}
          </p>
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
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-white/50">
            Septembre en cours
          </span>
          <span className="flex h-5 items-center gap-1 rounded-full bg-white/10 px-1.5 text-[9.5px] font-semibold text-[#DFFF3F]">
            <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
            dans les temps
          </span>
        </div>
        <div className="mt-2.5 flex items-end justify-between">
          <div>
            <div className="font-[family-name:var(--font-cabinet)] text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-none tracking-tight">
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
                <div
                  className={cn("w-3 rounded-sm", i === 5 ? "bg-[#DFFF3F]" : "bg-white/15")}
                  style={{ height: `${h * 0.5}px` }}
                />
                <span className="text-[8.5px] font-medium text-white/40">
                  {["L", "M", "M", "J", "V", "S", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE-LEVEL HELPERS (student-specific — not shared yet)
   ================================================================ */

function QuickAction({
  tone,
  eyebrow,
  title,
  hoverTitle,
  body,
}: {
  tone: "lime" | "dark";
  eyebrow: string;
  title: string;
  hoverTitle: string;
  body: string;
}) {
  const isLime = tone === "lime";
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative flex h-[148px] flex-col justify-between overflow-hidden rounded-[18px] p-4 text-left transition-transform hover:-translate-y-0.5",
        isLime ? "bg-[#DFFF3F] text-[#0B0B0F]" : "bg-[#0B0B0F] text-white",
      )}
    >
      <div>
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.09em]",
            isLime ? "text-[#0B0B0F]/60" : "text-white/50",
          )}
        >
          {eyebrow}
        </p>
        <p className="mt-1.5 font-[family-name:var(--font-cabinet)] text-[19px] font-bold leading-[1.15] tracking-tight">
          <TextMorph>{hover ? hoverTitle : title}</TextMorph>
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p
          className={cn(
            "max-w-[190px] text-[11.5px] leading-snug",
            isLime ? "text-[#0B0B0F]/70" : "text-white/60",
          )}
        >
          {body}
        </p>
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-transform group-hover:rotate-45",
            isLime ? "bg-[#0B0B0F] text-white" : "bg-white text-[#0B0B0F]",
          )}
        >
          {isLime ? <Plus className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
        </span>
      </div>
    </button>
  );
}

