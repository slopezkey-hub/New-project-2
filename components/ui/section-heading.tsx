export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-semibold tracking-tight text-copy sm:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-muted">{description}</p>
    </div>
  );
}
