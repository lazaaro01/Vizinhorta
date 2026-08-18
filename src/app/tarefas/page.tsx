"use client";

import { useMemo, useState } from "react";
import { Clock3, MapPin, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import { tasks as initialTasks, members, currentUser } from "@/lib/mock-data";
import { formatDayLabel } from "@/lib/format";
import type { TaskType } from "@/lib/types";

const FILTERS: { value: TaskType | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "mutirao", label: "Mutirão" },
  { value: "manutencao", label: "Manutenção" },
  { value: "rega", label: "Rega" },
  { value: "colheita", label: "Colheita" },
];

const TYPE_STYLE: Record<TaskType, { bg: string; text: string; emoji: string }> = {
  mutirao: { bg: "bg-emerald-50", text: "text-emerald-700", emoji: "🤝" },
  manutencao: { bg: "bg-sky-50", text: "text-sky-700", emoji: "🔧" },
  rega: { bg: "bg-cyan-50", text: "text-cyan-700", emoji: "💧" },
  colheita: { bg: "bg-amber-50", text: "text-amber-700", emoji: "🧺" },
};

function memberById(id: string) {
  return members.find((m) => m.id === id);
}

export default function TarefasPage() {
  const [filter, setFilter] = useState<TaskType | "todas">("todas");
  const [taskList, setTaskList] = useState(initialTasks);

  const visibleTasks = useMemo(() => {
    const filtered = filter === "todas" ? taskList : taskList.filter((t) => t.type === filter);
    return [...filtered].sort((a, b) => a.date.localeCompare(b.date));
  }, [filter, taskList]);

  function toggleJoin(taskId: string) {
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const alreadyIn = t.volunteersSigned.includes(currentUser.id);
        return {
          ...t,
          volunteersSigned: alreadyIn
            ? t.volunteersSigned.filter((id) => id !== currentUser.id)
            : [...t.volunteersSigned, currentUser.id],
        };
      })
    );
  }

  return (
    <div className="pb-6">
      <PageHeader title="Tarefas & mutirões" subtitle={`${taskList.length} atividades agendadas`} />

      <div className="space-y-4 px-4 pt-4">
        {/* filters */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.value
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-neutral-500 border border-black/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* task list */}
        <div className="space-y-3">
          {visibleTasks.map((task) => {
            const { weekday, day, month } = formatDayLabel(task.date);
            const style = TYPE_STYLE[task.type];
            const joined = task.volunteersSigned.includes(currentUser.id);
            const full = task.volunteersSigned.length >= task.volunteersNeeded;

            return (
              <div key={task.id} className="rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-neutral-50 text-neutral-700">
                    <span className="text-[10px] uppercase leading-none text-neutral-400">{weekday}</span>
                    <span className="text-base font-bold leading-none">{day}</span>
                    <span className="text-[9px] uppercase leading-none text-neutral-400">{month}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] font-semibold`}>
                        {style.emoji} {FILTERS.find((f) => f.value === task.type)?.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-neutral-900">{task.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{task.description}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock3 size={11} /> {task.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {task.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {task.volunteersSigned.slice(0, 4).map((id) => {
                        const m = id === currentUser.id ? currentUser : memberById(id);
                        if (!m) return null;
                        return (
                          <div key={id} className="rounded-full ring-2 ring-white">
                            <Avatar emoji={m.emoji} color={m.color} size="sm" />
                          </div>
                        );
                      })}
                    </div>
                    <span className="ml-2 text-[11px] text-neutral-500">
                      {task.volunteersSigned.length}/{task.volunteersNeeded}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleJoin(task.id)}
                    disabled={full && !joined}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      joined
                        ? "bg-emerald-50 text-emerald-700"
                        : full
                        ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                        : "bg-emerald-600 text-white active:bg-emerald-700"
                    }`}
                  >
                    {joined && <Check size={13} />}
                    {joined ? "Inscrito" : full ? "Lotado" : "Participar"}
                  </button>
                </div>
              </div>
            );
          })}

          {visibleTasks.length === 0 && (
            <p className="py-10 text-center text-sm text-neutral-400">
              Nenhuma tarefa nessa categoria por enquanto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
