"use client";

import { Calendar } from "lucide-react";
import { StatefulButton } from "@/components/library/stateful-button";

export type SessionRowProps = {
  when: string;
  title: string;
  teacher: string;
  duration: string;
  dot: string;
  joinable: boolean;
};

export function SessionRow({
  when,
  title,
  teacher,
  duration,
  dot,
  joinable,
}: SessionRowProps) {
  return (
    <div className="flex items-center gap-3.5 p-3.5">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#F5F5F7]">
        <Calendar className="h-4 w-4 text-[#0B0B0F]" strokeWidth={1.75} />
        <span
          className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white"
          style={{ backgroundColor: dot }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A8D93]">
          {when}
        </p>
        <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0B0B0F]">{title}</p>
        <p className="truncate text-[11px] text-[#8A8D93]">
          avec {teacher} · {duration}
        </p>
      </div>
      {joinable ? (
        <StatefulButton>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0B0B0F]" />
            Rejoindre
          </span>
        </StatefulButton>
      ) : (
        <button className="rounded-full border border-[#EFEFF1] px-3 py-1.5 text-[11.5px] font-semibold text-[#0B0B0F]">
          Détails
        </button>
      )}
    </div>
  );
}
