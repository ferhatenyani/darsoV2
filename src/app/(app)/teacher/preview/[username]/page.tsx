"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Calendar, MessageCircle, Star } from "lucide-react";
import { Avatar } from "@/components/app/avatar";
import { mockTeacherProfile } from "@/lib/mock/teacher-profile";

export default function TeacherPublicPreviewPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const p = mockTeacherProfile;
  const isSelf = username === p.username;

  return (
    <div className="min-h-dvh bg-[#EDEDEF] p-2.5">
      <div className="mx-auto max-w-[860px] rounded-[20px] bg-white p-6 shadow-[0_1px_2px_rgba(10,11,20,0.04)] md:p-10">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/teacher/profile"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#8A8D93] transition-colors hover:text-[#0B0B0F]"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={2} />
            Retour au profil privé
          </Link>
          {isSelf ? (
            <span className="rounded-full bg-[#DFFF3F] px-2.5 py-1 text-[10.5px] font-semibold text-[#0B0B0F]">
              Aperçu public
            </span>
          ) : null}
        </div>

        <section className="mt-6 flex flex-col items-start gap-5 md:flex-row md:items-center">
          <Avatar initials={p.initials} tone="brand" size={96} />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8A8D93]">
              @{username}
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-cabinet)] text-[32px] font-bold leading-[1.05] tracking-tight text-[#0B0B0F]">
              {p.fullName}
            </h1>
            <p className="mt-1 text-[13px] text-[#6E7178]">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11.5px] font-semibold text-[#0B0B0F]">
                <Star className="h-3 w-3 fill-[#DFFF3F]" color="#0B0B0F" strokeWidth={2} />
                {p.rating.toFixed(1)} · {p.reviewsCount} avis
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11.5px] text-[#4A4D54]">
                <Award className="h-3 w-3" strokeWidth={2} />
                {p.experience} ans d&apos;expérience
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0B0B0F] px-2.5 py-1 text-[11.5px] font-semibold text-white">
                {p.hourlyRate} MAD/h
              </span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 md:w-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0B0B0F] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1a1b21]"
            >
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              Réserver
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#EFEFF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0B0B0F] transition-colors hover:bg-[#F5F5F7]"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
              Contacter
            </button>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8D93]">
            À propos
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A4D54]">{p.bio}</p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8D93]">
              Matières
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.subjectsTaught.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#EFEFF1] px-2.5 py-1 text-[11.5px] text-[#0B0B0F]"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8D93]">
              Niveaux
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.levelsTaught.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-[#EFEFF1] px-2.5 py-1 text-[11.5px] text-[#0B0B0F]"
                >
                  {l}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8D93]">
              Langues
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.languagesSpoken.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-[#EFEFF1] px-2.5 py-1 text-[11.5px] text-[#0B0B0F]"
                >
                  {l}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8D93]">
              Disponibilités
            </h2>
            <p className="mt-2 text-[13px] text-[#4A4D54]">{p.availabilityHours}</p>
            <p className="mt-1 text-[11.5px] text-[#8A8D93]">Basé à {p.city}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
