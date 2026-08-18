import Link from "next/link";
import { Bell, CloudSun, Droplets, MapPin, Sprout, Users, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import {
  currentUser,
  plots,
  tasks,
  posts,
  weather,
  members,
} from "@/lib/mock-data";
import { formatDayLabel, formatRelativeTime } from "@/lib/format";

const TASK_TYPE_LABEL: Record<string, string> = {
  mutirao: "Mutirão",
  manutencao: "Manutenção",
  colheita: "Colheita",
  rega: "Rega",
};

export default function HomePage() {
  const occupied = plots.filter((p) => p.status === "occupied" || p.status === "mine").length;
  const upcomingTasks = [...tasks]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="pb-4">
      <PageHeader
        title="Vizinhorta"
        subtitle="Horta Jardim das Acácias"
        right={
          <Link
            href="/perfil"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 active:bg-black/5"
            aria-label="Notificações"
          >
            <Bell size={20} />
            {currentUser.notifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {currentUser.notifications}
              </span>
            )}
          </Link>
        }
      />

      <div className="space-y-5 px-4 pt-4">
        {/* greeting */}
        <div className="flex items-center gap-3">
          <Avatar emoji={currentUser.emoji} color={currentUser.color} size="lg" />
          <div>
            <p className="text-sm text-neutral-500">Bom dia,</p>
            <p className="text-lg font-bold text-neutral-900">
              {currentUser.name.split(" ")[0]} 👋
            </p>
          </div>
        </div>

        {/* weather */}
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-4 py-3.5 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <CloudSun size={32} strokeWidth={1.8} />
            <div>
              <p className="text-2xl font-bold leading-none">{weather.tempC}°C</p>
              <p className="text-xs text-emerald-100">{weather.condition}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-100">
            <Droplets size={14} />
            <span>{weather.rainChancePct}% chuva</span>
          </div>
        </div>

        {/* quick stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={<Sprout size={16} />} value={`${occupied}/${plots.length}`} label="Lotes ativos" />
          <StatCard icon={<Users size={16} />} value={members.length} label="Membros" />
          <StatCard icon={<MapPin size={16} />} value={currentUser.plotIds.length} label="Meus lotes" />
        </div>

        {/* quick actions */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <QuickAction href="/mapa" emoji="🗺️" label="Mapa" />
          <QuickAction href="/tarefas" emoji="🤝" label="Mutirões" />
          <QuickAction href="/comunidade?tab=trocas" emoji="🌱" label="Trocas" />
          <QuickAction href="/comunidade?tab=eventos" emoji="🎉" label="Eventos" />
        </div>

        {/* upcoming tasks */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Próximas tarefas</h2>
            <Link href="/tarefas" className="flex items-center gap-0.5 text-xs font-medium text-emerald-700">
              Ver todas <ArrowRight size={12} />
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
            {upcomingTasks.map((task) => {
              const { weekday, day, month } = formatDayLabel(task.date);
              return (
                <Link
                  href="/tarefas"
                  key={task.id}
                  className="w-40 shrink-0 rounded-2xl border border-black/5 bg-white p-3 shadow-sm active:scale-[0.98]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                      {TASK_TYPE_LABEL[task.type]}
                    </span>
                    <span className="text-right text-[11px] font-medium text-neutral-500">
                      {weekday}<br />{day} {month}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                    {task.title}
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {task.volunteersSigned.length}/{task.volunteersNeeded} voluntários
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* community feed preview */}
        <section className="pb-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Atividade da comunidade</h2>
            <Link href="/comunidade" className="flex items-center gap-0.5 text-xs font-medium text-emerald-700">
              Ver mais <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentPosts.map((post) => (
              <Link
                href="/comunidade"
                key={post.id}
                className="flex gap-2.5 rounded-2xl border border-black/5 bg-white p-3 shadow-sm active:scale-[0.99]"
              >
                <Avatar emoji={post.authorEmoji} color={post.authorColor} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {post.authorName}
                    </p>
                    <span className="shrink-0 text-[11px] text-neutral-400">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-neutral-600">{post.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-black/5 bg-white py-3 shadow-sm">
      <span className="text-emerald-600">{icon}</span>
      <span className="text-base font-bold text-neutral-900">{value}</span>
      <span className="text-[10px] text-neutral-500">{label}</span>
    </div>
  );
}

function QuickAction({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1.5 active:opacity-70">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm border border-black/5">
        {emoji}
      </span>
      <span className="text-[11px] font-medium text-neutral-600">{label}</span>
    </Link>
  );
}
