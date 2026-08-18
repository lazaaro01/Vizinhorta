"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, ListChecks, Users, CircleUserRound } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/tarefas", label: "Tarefas", icon: ListChecks },
  { href: "/comunidade", label: "Comunidade", icon: Users },
  { href: "/perfil", label: "Perfil", icon: CircleUserRound },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex shrink-0 items-stretch border-t border-black/5 bg-white/95 backdrop-blur-sm px-1 pt-1 shadow-[0_-4px_16px_-8px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-colors"
          >
            <span
              className={`flex items-center justify-center rounded-full p-1.5 transition-colors ${
                isActive ? "bg-emerald-100 text-emerald-700" : "text-neutral-400"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
            </span>
            <span
              className={`text-[10px] font-medium ${
                isActive ? "text-emerald-700" : "text-neutral-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
