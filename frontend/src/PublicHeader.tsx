import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import type { Page } from "./App";
import { Logo } from "./Picture";
import { Button } from "./components/ui";

export function PublicHeader({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Directory", page: "directory" },
    { label: "Mentorship", page: "mentorship" },
    { label: "Jobs", page: "jobs" },
  ];
  const navigate = (destination: Page) => {
    setPage(destination);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <span onClick={() => navigate("home")}><Logo /></span>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${page === link.page ? "bg-slate-100 text-slate-950" : "text-slate-500 hover:text-slate-950"}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" onClick={() => navigate("dashboard")}>Login</Button>
          <Button onClick={() => navigate("register")}>Join the network <ArrowRight className="size-4" /></Button>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl bg-slate-100 lg:hidden" aria-label="Open navigation">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
          {links.map((link) => (
            <button key={link.page} onClick={() => navigate(link.page)} className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {link.label}
            </button>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => navigate("dashboard")}>Login</Button>
            <Button onClick={() => navigate("register")}>Register</Button>
          </div>
        </div>
      )}
    </header>
  );
}
