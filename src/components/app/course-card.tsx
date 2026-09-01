import { Bookmark, Star } from "lucide-react";
import { Avatar } from "./avatar";
import { cn } from "@/lib/utils";

export type CourseCardTone = "lime" | "soft-blue" | "cream";

export type CourseCardProps = {
  subject: string;
  title: string;
  teacher: { name: string; initials: string };
  rating: number;
  sessionsGiven: number;
  price: number;
  nextSlot: string;
  tone: CourseCardTone;
};

export function CourseCard({
  subject,
  title,
  teacher,
  rating,
  sessionsGiven,
  price,
  nextSlot,
  tone,
}: CourseCardProps) {
  const toneBg = {
    lime: "bg-[#DFFF3F]",
    "soft-blue": "bg-[#C4CFFF]",
    cream: "bg-[#F0EDE4]",
  }[tone];
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] border border-[#EFEFF1] bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(10,11,20,0.06)]">
      <div className={cn("relative h-20", toneBg)}>
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-semibold text-[#0B0B0F]">
          {subject}
        </span>
        <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#0B0B0F] px-1.5 py-0.5 text-[10.5px] font-semibold text-white">
          <Star className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
          {rating.toFixed(1)}
        </span>
        <button
          aria-label="Bookmark"
          className="absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[#0B0B0F]"
        >
          <Bookmark className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[13px] font-semibold leading-snug text-[#0B0B0F]">{title}</h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Avatar initials={teacher.initials} tone="neutral" size={18} />
          <p className="truncate text-[11px] text-[#6E7178]">
            {teacher.name} · {sessionsGiven} séances
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#EFEFF1] pt-2.5">
          <div>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#B0B3B8]">
              Prochain créneau
            </p>
            <p className="text-[11px] font-semibold text-[#0B0B0F]">{nextSlot}</p>
          </div>
          <div className="text-right">
            <p className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#B0B3B8]">
              À partir de
            </p>
            <p className="text-[12px] font-bold text-[#0B0B0F]">
              {price} <span className="text-[9.5px] font-medium text-[#8A8D93]">MAD/h</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
