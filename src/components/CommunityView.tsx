"use client";

import { useMemo, useState } from "react";
import { Heart, MessageCircle, MapPin, Calendar, Check, Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import { posts as initialPosts, events as initialEvents, exchangeItems, members } from "@/lib/mock-data";
import { formatDayLabel, formatRelativeTime } from "@/lib/format";
import type { ExchangeCategory, PostType } from "@/lib/types";

type Tab = "feed" | "eventos" | "trocas" | "membros";

const TABS: { value: Tab; label: string }[] = [
  { value: "feed", label: "Feed" },
  { value: "eventos", label: "Eventos" },
  { value: "trocas", label: "Trocas" },
  { value: "membros", label: "Membros" },
];

const POST_TYPE_STYLE: Record<PostType, { bg: string; text: string; label: string }> = {
  anuncio: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Aviso" },
  colheita: { bg: "bg-amber-50", text: "text-amber-700", label: "Colheita" },
  duvida: { bg: "bg-sky-50", text: "text-sky-700", label: "Dúvida" },
  geral: { bg: "bg-neutral-100", text: "text-neutral-600", label: "Geral" },
};

const EXCHANGE_LABEL: Record<ExchangeCategory, string> = {
  semente: "Semente",
  muda: "Muda",
  ferramenta: "Ferramenta",
  adubo: "Adubo",
};

const EXCHANGE_TYPE_STYLE: Record<string, { bg: string; text: string }> = {
  troca: { bg: "bg-sky-50", text: "text-sky-700" },
  doacao: { bg: "bg-emerald-50", text: "text-emerald-700" },
  emprestimo: { bg: "bg-amber-50", text: "text-amber-700" },
};

export default function CommunityView({ initialTab }: { initialTab?: string }) {
  const validTab = TABS.some((t) => t.value === initialTab) ? (initialTab as Tab) : "feed";
  const [tab, setTab] = useState<Tab>(validTab);

  return (
    <div className="pb-6">
      <PageHeader title="Comunidade" subtitle="Jardim das Acácias" />

      <div className="border-b border-black/5 px-4 pb-3 pt-1">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                tab === t.value ? "bg-emerald-600 text-white" : "bg-white text-neutral-500 border border-black/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {tab === "feed" && <FeedTab />}
        {tab === "eventos" && <EventsTab />}
        {tab === "trocas" && <ExchangeTab />}
        {tab === "membros" && <MembersTab />}
      </div>
    </div>
  );
}

function FeedTab() {
  const [posts, setPosts] = useState(initialPosts);

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const style = POST_TYPE_STYLE[post.type];
        return (
          <div key={post.id} className="rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Avatar emoji={post.authorEmoji} color={post.authorColor} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">{post.authorName}</p>
                <p className="text-[11px] text-neutral-400">{formatRelativeTime(post.createdAt)} atrás</p>
              </div>
              <span className={`shrink-0 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] font-semibold`}>
                {style.label}
              </span>
            </div>
            <p className="mt-2.5 text-sm text-neutral-700">{post.content}</p>
            <div className="mt-3 flex items-center gap-4 border-t border-black/5 pt-2.5">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  post.liked ? "text-red-500" : "text-neutral-500"
                }`}
              >
                <Heart size={15} fill={post.liked ? "currentColor" : "none"} />
                {post.likes}
              </button>
              <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <MessageCircle size={15} />
                {post.comments}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EventsTab() {
  const [events, setEvents] = useState(initialEvents);

  function toggleGoing(id: string) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, going: !e.going, attendees: e.going ? e.attendees - 1 : e.attendees + 1 } : e
      )
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const { weekday, day, month } = formatDayLabel(event.date);
        return (
          <div key={event.id} className="flex gap-3 rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <span className="text-[10px] uppercase leading-none">{weekday}</span>
              <span className="text-base font-bold leading-none">{day}</span>
              <span className="text-[9px] uppercase leading-none">{month}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-900">{event.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{event.description}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {event.location}
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">{event.attendees} confirmados</span>
                <button
                  onClick={() => toggleGoing(event.id)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    event.going ? "bg-emerald-50 text-emerald-700" : "bg-emerald-600 text-white active:bg-emerald-700"
                  }`}
                >
                  {event.going && <Check size={13} />}
                  {event.going ? "Vou" : "Confirmar"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExchangeTab() {
  const [filter, setFilter] = useState<ExchangeCategory | "todas">("todas");

  const filtered = useMemo(
    () => (filter === "todas" ? exchangeItems : exchangeItems.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <div className="space-y-3">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter("todas")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
            filter === "todas" ? "bg-emerald-600 text-white" : "bg-white text-neutral-500 border border-black/5"
          }`}
        >
          Todas
        </button>
        {(Object.keys(EXCHANGE_LABEL) as ExchangeCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === cat ? "bg-emerald-600 text-white" : "bg-white text-neutral-500 border border-black/5"
            }`}
          >
            {EXCHANGE_LABEL[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((item) => {
          const style = EXCHANGE_TYPE_STYLE[item.type];
          return (
            <div key={item.id} className="flex gap-3 rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm">
              <Avatar emoji={item.ownerEmoji} color="bg-neutral-100" size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-neutral-900">{item.title}</p>
                  <span className={`shrink-0 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] font-semibold capitalize`}>
                    {item.type}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">{item.description}</p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  {EXCHANGE_LABEL[item.category]} · {item.ownerName}
                </p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-neutral-400">Nada por aqui ainda.</p>
        )}
      </div>
    </div>
  );
}

function MembersTab() {
  const [query, setQuery] = useState("");

  const filtered = members.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-3.5 py-2">
        <Search size={15} className="text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar membro"
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>
      <div className="space-y-2">
        {filtered.map((member) => (
          <div key={member.id} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
            <Avatar emoji={member.emoji} color={member.color} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-neutral-900">{member.name}</p>
                {member.role === "coordenador" && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700">
                    Coordenador
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-neutral-500">{member.bio}</p>
            </div>
            <span className="shrink-0 text-[11px] text-neutral-400">
              {member.plotIds.length} {member.plotIds.length === 1 ? "lote" : "lotes"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
