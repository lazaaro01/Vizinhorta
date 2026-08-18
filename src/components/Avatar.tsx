export default function Avatar({
  emoji,
  color,
  size = "md",
}: {
  emoji: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-base",
    md: "h-10 w-10 text-lg",
    lg: "h-14 w-14 text-2xl",
  }[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${color} ${sizeClasses}`}
    >
      <span>{emoji}</span>
    </div>
  );
}
