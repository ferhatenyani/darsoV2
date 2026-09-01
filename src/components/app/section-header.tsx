export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <h2 className="font-[family-name:var(--font-cabinet)] text-[18px] font-bold tracking-tight text-[#0B0B0F]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-[11.5px] text-[#8A8D93]">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        typeof action === "string" ? (
          <button className="shrink-0 text-[11.5px] font-medium text-[#8A8D93] transition-colors hover:text-[#0B0B0F]">
            {action}
          </button>
        ) : (
          action
        )
      ) : null}
    </div>
  );
}
