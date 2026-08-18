import Link from "next/link";
import { Clock3 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { plots } from "@/lib/mock-data";
import type { Plot } from "@/lib/types";

const STATUS_STYLE: Record<Plot["status"], string> = {
  mine: "bg-emerald-600 border-emerald-600 text-white",
  occupied: "bg-stone-100 border-stone-200 text-stone-700",
  available: "bg-white border-dashed border-emerald-300 text-emerald-600",
  reserved: "bg-amber-50 border-amber-300 text-amber-700",
};

const STATUS_LABEL: Record<Plot["status"], string> = {
  mine: "Meu lote",
  occupied: "Ocupado",
  available: "Disponível",
  reserved: "Em espera",
};

export default function MapaPage() {
  const rows = Math.max(...plots.map((p) => p.row)) + 1;
  const cols = Math.max(...plots.map((p) => p.col)) + 1;
  const availableCount = plots.filter((p) => p.status === "available").length;

  return (
    <div className="pb-6">
      <PageHeader title="Mapa da horta" subtitle={`${plots.length} lotes · Jardim das Acácias`} />

      <div className="space-y-4 px-4 pt-4">
        {availableCount > 0 && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-800">
            <span className="text-base">🌱</span>
            <p>
              <strong>{availableCount} {availableCount === 1 ? "lote disponível" : "lotes disponíveis"}</strong> para reserva agora.
            </p>
          </div>
        )}

        {/* legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500">
          {(Object.keys(STATUS_LABEL) as Plot["status"][]).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-[4px] border ${STATUS_STYLE[status]}`} />
              {STATUS_LABEL[status]}
            </div>
          ))}
        </div>

        {/* grid map */}
        <div
          className="grid gap-2 rounded-2xl border border-black/5 bg-white p-3 shadow-sm"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: rows * cols }).map((_, idx) => {
            const row = Math.floor(idx / cols);
            const col = idx % cols;
            const plot = plots.find((p) => p.row === row && p.col === col);
            if (!plot) return <div key={idx} />;
            return (
              <Link
                href={`/lote/${plot.id}`}
                key={plot.id}
                className={`flex aspect-square flex-col items-center justify-center gap-0.5 rounded-xl border-2 text-[11px] font-semibold transition-transform active:scale-95 ${STATUS_STYLE[plot.status]}`}
              >
                <span>{plot.code}</span>
                {plot.status === "reserved" && (
                  <Clock3 size={12} className="opacity-70" />
                )}
                {(plot.status === "occupied" || plot.status === "mine") && (
                  <span className="text-sm leading-none">
                    {plot.crops[0] ? cropEmoji(plot.crops[0]) : "🌿"}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* plot list */}
        <section>
          <h2 className="mb-2 text-sm font-bold text-neutral-900">Todos os lotes</h2>
          <div className="space-y-2">
            {plots.map((plot) => (
              <Link
                href={`/lote/${plot.id}`}
                key={plot.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-3.5 py-3 shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 text-xs font-bold ${STATUS_STYLE[plot.status]}`}
                  >
                    {plot.code}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {plot.gardenerName ?? STATUS_LABEL[plot.status]}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {plot.crops.length > 0 ? plot.crops.join(", ") : `${plot.sizeM2} m² · ${STATUS_LABEL[plot.status]}`}
                    </p>
                  </div>
                </div>
                {plot.waitlist > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    {plot.waitlist} na fila
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function cropEmoji(crop: string) {
  const map: Record<string, string> = {
    Alface: "🥬", Rúcula: "🥬", Tomate: "🍅", Pimentão: "🫑",
    Capuchinha: "🌸", Calêndula: "🌼", Cenoura: "🥕", Beterraba: "🥕",
    Manjericão: "🌿", Alecrim: "🌿", Salsinha: "🌿", Morango: "🍓",
    Milho: "🌽", Feijão: "🫘", Abóbora: "🎃", Couve: "🥬", Berinjela: "🍆",
  };
  return map[crop] ?? "🌱";
}
