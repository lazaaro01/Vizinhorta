import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  backHref,
  right,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-[var(--background)]/90 px-4 pb-3 pt-[max(env(safe-area-inset-top),1rem)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {backHref && (
          <Link
            href={backHref}
            className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 active:bg-black/5"
            aria-label="Voltar"
          >
            <ChevronLeft size={22} />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold text-neutral-900">{title}</h1>
          {subtitle && (
            <p className="truncate text-sm text-neutral-500">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
    </header>
  );
}
