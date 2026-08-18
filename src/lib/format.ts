const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTHS = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

export function formatDayLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: WEEKDAYS[d.getDay()],
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
  };
}

export function formatFullDate(dateStr: string) {
  const { weekday, day, month } = formatDayLabel(dateStr);
  return `${weekday}, ${day} ${month}`;
}

export function formatRelativeTime(isoStr: string) {
  const date = new Date(isoStr);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `${diffH} h`;
  const diffD = Math.round(diffH / 24);
  return `${diffD} d`;
}
