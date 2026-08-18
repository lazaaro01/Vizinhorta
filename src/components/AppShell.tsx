import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-neutral-200 md:items-center md:py-8">
      <div
        className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[var(--background)] md:h-[880px] md:max-h-[880px] md:rounded-[2.75rem] md:border-[10px] md:border-neutral-900 md:shadow-2xl"
      >
        <div className="hidden shrink-0 items-center justify-center py-1.5 md:flex">
          <div className="h-1.5 w-24 rounded-full bg-neutral-900/90" />
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
