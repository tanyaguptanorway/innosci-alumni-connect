import { useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Page } from "./App";
import data from "../../content/alumni.json";
import { Avatar, Logo } from "./Picture";

const {
  pageLabel,
  pics
} = data;
const photos = pics;
const pageLabels: Record<Page, string> = pageLabel;

export function AppShell({ page, setPage, admin = false, children }: { page: Page; setPage: (page: Page) => void; admin?: boolean; children: React.ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const alumniLinks: { page: Page; label: string; icon: LucideIcon }[] = [
    { page: "dashboard", label: "Overview", icon: LayoutDashboard },
    { page: "directory", label: "Alumni Directory", icon: Users },
    { page: "mentorship", label: "Mentorship", icon: HeartHandshake },
    { page: "jobs", label: "Opportunities", icon: BriefcaseBusiness },
  ];
  const adminLinks: { page: Page; label: string; icon: LucideIcon }[] = [
    { page: "admin", label: "Overview", icon: LayoutDashboard },
    { page: "admin", label: "Alumni Records", icon: Users },
    { page: "admin", label: "Mentorship", icon: HeartHandshake },
    { page: "admin", label: "Job Postings", icon: BriefcaseBusiness },
    { page: "admin", label: "Featured Stories", icon: Sparkles },
  ];
  const links = admin ? adminLinks : alumniLinks;
  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-5 py-5"><Logo /></div>
      <div className="px-4 py-6">
        <div className="mb-3 px-3 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">{admin ? "Administration" : "Alumni workspace"}</div>
        <nav className="space-y-1">
          {links.map(({ page: target, label, icon: Icon }, index) => (
            <button key={`${label}-${index}`} onClick={() => { setPage(target); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${page === target && (target !== "admin" || index === 0) ? "bg-navy-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"}`}>
              <Icon className="size-[1.1rem]" /> {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        {!admin && <div className="mb-4 rounded-2xl bg-teal-50 p-4"><div className="flex items-center gap-2 text-sm font-bold text-teal-900"><Sparkles className="size-4" /> Complete your profile</div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full w-4/5 rounded-full bg-teal-500" /></div><div className="mt-2 text-xs text-teal-700">80% complete</div></div>}
        <button onClick={() => setPage("home")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"><LogOut className="size-4" /> Sign out</button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:block">{sidebar}</aside>
      {mobileNav && <div className="fixed inset-0 z-50 bg-navy-950/40 backdrop-blur-sm lg:hidden"><aside className="h-full w-72 bg-white">{sidebar}</aside><button onClick={() => setMobileNav(false)} className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white"><X className="size-5" /></button></div>}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="grid size-10 place-items-center rounded-xl bg-slate-100 lg:hidden"><Menu className="size-5" /></button><div><div className="text-lg font-bold text-slate-950">{pageLabels[page]}</div><div className="hidden text-xs text-slate-400 sm:block">{admin ? "Manage and grow the InnoSCI community" : "Stay connected. Keep growing."}</div></div></div>
          <div className="flex items-center gap-2">
            {!admin && <button className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 sm:flex"><Search className="size-4" /> Search community</button>}
            <button className="relative grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-teal-500 ring-2 ring-slate-100" /></button>
            <button onClick={() => setPage(admin ? "dashboard" : "admin")} className="ml-1 flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-slate-100">
              <Avatar src={admin ? photos[2] : photos[0]} name={admin ? "Admin" : "Amara"} className="size-9" />
              <span className="hidden text-left md:block"><span className="block text-xs font-bold text-slate-900">{admin ? "InnoSCI Admin" : "Amara Okafor"}</span><span className="block text-[0.65rem] text-slate-400">{admin ? "Switch to alumni" : "Switch to admin"}</span></span>
            </button>
          </div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}