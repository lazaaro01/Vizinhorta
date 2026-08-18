import Link from "next/link";
import { notFound } from "next/navigation";
import { Ruler, Droplets, Clock3, Users2, Camera } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import { plots, tasks, members } from "@/lib/mock-data";
import { formatDayLabel } from "@/lib/format";
import type { Plot } from "@/lib/types";

const STATUS_LABEL: Record<Plot["status"], string> = {
  mine: "Meu lote",
  occupied: "Ocupado",
  available: "Disponível",
  reserved: "Em espera",
};

const STATUS_DOT: Record<Plot["status"], string> = {
  mine: "bg-emerald-600",
  occupied: "bg-stone-400",
  available: "bg-emerald-400",
  reserved: "bg-amber-500",
};

const JOURNAL = [
  { emoji: "🌱", note: "Mudas transplantadas para o lote.", daysAgo: 21 },
  { emoji: "🌿", note: "Primeira poda e adubação.", daysAgo: 9 },
  { emoji: "🍅", note: "Início da frutificação, tudo verde!", daysAgo: 2 },
];

export function generateStaticParams() {
  return plots.map((p) => ({ id: p.id }));
}

export default async function LoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plot = plots.find((p) => p.id === id);
  if (!plot) notFound();

  const gardener = members.find((m) => m.id === plot.gardenerId);
  const plotTasks = tasks.filter((t) => t.plotId === plot.id);

  return (
    <div className="pb-6">
      <PageHeader title={`Lote ${plot.code}`} subtitle={`${plot.sizeM2} m² · Jardim das Acácias`} backHref="/mapa" />

      <div className="space-y-5 px-4 pt-4">
        {/* status hero */}
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[plot.status]}`} />
              <span className="text-sm font-semibold text-neutral-900">{STATUS_LABEL[plot.status]}</span>
            </div>
            {plot.waitlist > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                {plot.waitlist} na fila de espera
              </span>
            )}
          </div>

          {gardener && (
            <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-3">
              <Avatar emoji={gardener.emoji} color={gardener.color} />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{gardener.name}</p>
                <p className="text-xs text-neutral-500">
                  Cultivando desde {formatDayLabel(gardener.joinedAt).month}/{gardener.joinedAt.slice(0, 4)}
                </p>
              </div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-black/5 pt-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Ruler size={16} className="text-emerald-600" />
              <span className="text-xs font-medium text-neutral-700">{plot.sizeM2} m²</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Droplets size={16} className="text-emerald-600" />
              <span className="text-xs font-medium text-neutral-700">{plot.lastWatered ?? "—"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users2 size={16} className="text-emerald-600" />
              <span className="text-xs font-medium text-neutral-700">{plot.waitlist} na fila</span>
            </div>
          </div>
        </div>

        {/* crops */}
        {plot.crops.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-bold text-neutral-900">Plantado atualmente</h2>
            <div className="flex flex-wrap gap-2">
              {plot.crops.map((crop) => (
                <span
                  key={crop}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                >
                  {crop}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* tasks for this plot */}
        {plotTasks.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-bold text-neutral-900">Tarefas do lote</h2>
            <div className="space-y-2">
              {plotTasks.map((task) => {
                const { day, month } = formatDayLabel(task.date);
                return (
                  <div key={task.id} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <span className="text-sm font-bold leading-none">{day}</span>
                      <span className="text-[10px] uppercase leading-none">{month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900">{task.title}</p>
                      <p className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock3 size={11} /> {task.time} · {task.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* photo journal */}
        {(plot.status === "mine" || plot.status === "occupied") && (
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900">Diário do lote</h2>
              {plot.status === "mine" && (
                <button className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <Camera size={13} /> Adicionar
                </button>
              )}
            </div>
            <div className="space-y-2">
              {JOURNAL.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 text-2xl">
                    {entry.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-neutral-700">{entry.note}</p>
                    <p className="text-xs text-neutral-400">há {entry.daysAgo} dias</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* primary action */}
        <div className="pt-1">
          <PlotAction status={plot.status} />
        </div>
      </div>
    </div>
  );
}

function PlotAction({ status }: { status: Plot["status"] }) {
  if (status === "available") {
    return (
      <button className="w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm active:bg-emerald-700">
        Reservar este lote
      </button>
    );
  }
  if (status === "reserved") {
    return (
      <button className="w-full rounded-full bg-amber-500 py-3 text-sm font-semibold text-white shadow-sm active:bg-amber-600">
        Entrar na fila de espera
      </button>
    );
  }
  if (status === "mine") {
    return (
      <div className="flex gap-2">
        <button className="flex-1 rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm active:bg-emerald-700">
          Registrar rega
        </button>
        <Link
          href="/tarefas"
          className="flex-1 rounded-full border border-emerald-200 bg-white py-3 text-center text-sm font-semibold text-emerald-700 active:bg-emerald-50"
        >
          Ver tarefas
        </Link>
      </div>
    );
  }
  return (
    <Link
      href="/comunidade"
      className="block w-full rounded-full border border-emerald-200 bg-white py-3 text-center text-sm font-semibold text-emerald-700 active:bg-emerald-50"
    >
      Enviar mensagem ao responsável
    </Link>
  );
}
