import { cn } from "@/lib/utils";

export type AvatarTone = "neutral" | "brand" | "lime" | "soft-blue" | "cream";

const paletteByTone: Record<AvatarTone, string> = {
  neutral: "bg-[#F0F0F2] text-[#0B0B0F]",
  brand: "bg-[#0B0B0F] text-[#DFFF3F]",
  lime: "bg-[#DFFF3F] text-[#0B0B0F]",
  "soft-blue": "bg-[#C4CFFF] text-[#0B0B0F]",
  cream: "bg-[#F0EDE4] text-[#0B0B0F]",
};

export function Avatar({
  initials,
  tone = "neutral",
  size = 32,
  className,
}: {
  initials: string;
  tone?: AvatarTone;
  size?: number;
  className?: string;
}) {
  const fontSize = Math.max(9, Math.round(size * 0.36));
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        paletteByTone[tone],
        className,
      )}
      style={{ width: size, height: size, fontSize }}
    >
      {initials}
    </div>
  );
}
