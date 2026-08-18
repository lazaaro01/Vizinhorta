import Link from "next/link";
import { Award, Droplets, MessagesSquare, Sprout, MapPin, Phone, LogOut, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import Switch from "@/components/Switch";
import { currentUser, members, plots, posts, tasks } from "@/lib/mock-data";

export default function PerfilPage() {
  const me = members.find((m) => m.id === currentUser.id)!;
  const myPlots = plots.filter((p) => currentUser.plotIds.includes(p.id));
  const myPosts = posts.filter((p) => p.authorId === currentUser.id).length;
  const myTasks = tasks.filter((t) => t.volunteersSigned.includes(currentUser.id)).length;

  return (
    <div className="pb-8">
      <PageHeader title="Perfil" />

      <div className="space-y-5 px-4 pt-4">
        {/* profile card */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <Avatar emoji={me.emoji} color={me.color} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-neutral-900">{me.name}</p>
            <p className="truncate text-xs text-neutral-500">{me.bio}</p>
            <p className="mt-0.5 text-[11px] text-neutral-400">
              Membro desde {new Date(me.joinedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatBox icon={<Sprout size={16} />} value={myPlots.length} label="Lotes" />
          <StatBox icon={<Droplets size={16} />} value={myTasks} label="Mutirões" />
          <StatBox icon={<MessagesSquare size={16} />} value={myPosts} label="Posts" />
        </div>

        {/* badges */}
        {me.badges.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-bold text-neutral-900">Conquistas</h2>
            <div className="flex flex-wrap gap-2">
              {me.badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                >
                  <Award size={12} /> {badge}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* my plots */}
        <section>
          <h2 className="mb-2 text-sm font-bold text-neutral-900">Meus lotes</h2>
          <div className="space-y-2">
            {myPlots.map((plot) => (
              <Link
                key={plot.id}
                href={`/lote/${plot.id}`}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-3.5 py-3 shadow-sm active:scale-[0.99]"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Lote {plot.code}</p>
                  <p className="text-xs text-neutral-500">{plot.crops.join(", ")}</p>
                </div>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
            ))}
            {myPlots.length === 0 && (
              <Link
                href="/mapa"
                className="block rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 px-3.5 py-3 text-center text-sm font-medium text-emerald-700"
              >
                Você ainda não tem um lote. Ver mapa da horta →
              </Link>
            )}
          </div>
        </section>

        {/* notification settings */}
        <section>
          <h2 className="mb-2 text-sm font-bold text-neutral-900">Notificações</h2>
          <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white px-3.5 shadow-sm">
            <SettingRow label="Lembretes de rega" defaultChecked />
            <SettingRow label="Novos mutirões" defaultChecked />
            <SettingRow label="Mensagens da comunidade" defaultChecked={false} />
            <SettingRow label="Eventos e feiras" defaultChecked />
          </div>
        </section>

        {/* garden info */}
        <section>
          <h2 className="mb-2 text-sm font-bold text-neutral-900">Sobre a horta</h2>
          <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white px-3.5 shadow-sm">
            <div className="flex items-center gap-3 py-3">
              <MapPin size={16} className="shrink-0 text-neutral-400" />
              <p className="text-sm text-neutral-700">Rua das Acácias, 145 — Vila Verde</p>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Phone size={16} className="shrink-0 text-neutral-400" />
              <p className="text-sm text-neutral-700">Coordenação: Marina Alves</p>
            </div>
          </div>
        </section>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white py-3 text-sm font-semibold text-red-500 shadow-sm active:bg-red-50">
          <LogOut size={16} /> Sair da conta
        </button>
      </div>
    </div>
  );
}

function StatBox({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-black/5 bg-white py-3 shadow-sm">
      <span className="text-emerald-600">{icon}</span>
      <span className="text-base font-bold text-neutral-900">{value}</span>
      <span className="text-[10px] text-neutral-500">{label}</span>
    </div>
  );
}

function SettingRow({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-neutral-700">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
