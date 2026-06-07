import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  id?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  id,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div id={id} className={clsx("mb-12", className)}>
      <h2 className="font-mono text-accent-green text-lg mb-2 select-none">
        <span className="text-gray-600">$</span> {title.toLowerCase().replace(/\s+/g, "-")}
      </h2>
      <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-3 text-gray-400 text-lg font-sans max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
