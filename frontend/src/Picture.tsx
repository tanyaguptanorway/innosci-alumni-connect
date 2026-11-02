export function Avatar({ src, name, className = "size-11" }: { src: string; name: string; className?: string }) {
  return <img src={src} alt={`${name} profile`} className={`${className} shrink-0 rounded-full object-cover ring-2 ring-white`} />;
}
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center rounded-lg bg-white px-2 py-1.5 text-left"
      aria-label="InnoSCI Alumni Connect home"
    >
      <img
        src="/src/assets/innoSciLogo.png"
        alt="InnoSCI School of Programming"
        className={compact ? "h-9 w-auto" : "h-11 w-auto"}
      />
    </button>
  );
}