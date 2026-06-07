import clsx from "clsx";

interface BadgeProps {
  text: string;
  variant?: "green" | "cyan" | "amber" | "gray";
  className?: string;
}

export function Badge({
  text,
  variant = "green",
  className,
}: BadgeProps) {
  const variants = {
    green: "text-accent-green border-accent-green/30 bg-accent-green/5",
    cyan: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
    amber: "text-accent-amber border-accent-amber/30 bg-accent-amber/5",
    gray: "text-gray-400 border-gray-600/30 bg-gray-600/5",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border",
        variants[variant],
        className,
      )}
    >
      {text}
    </span>
  );
}
