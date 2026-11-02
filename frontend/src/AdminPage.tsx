import { useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileCheck2,
  HeartHandshake,
  Plus,
  Search,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import { Button, Pill } from "./components/ui";
import type { Page } from "./App";
import data from "../../content/alumni.json";
import { AppShell } from "./AppShell";

const {
  pendingSeeds,
} = data;

const pendingSeed = pendingSeeds;
import {PanelHeader} from "./PanelHeader";

export function AdminPage({ setPage }: { setPage: (page: Page) => void }) {
  const [pending, setPending] = useState(pendingSeed);
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState(false);
  const [notice, setNotice] = useState("");
  const allSelected = pending.length > 0 && selected.length === pending.length;
  const approve = () => {
    setPending(pending.filter((person) => !selected.includes(person.email)));
    setNotice(`${selected.length} alumni ${selected.length === 1 ? "profile" : "profiles"} approved successfully.`);
    setSelected([]);
    setModal(false);
    window.setTimeout(() => setNotice(""), 3500);
  };
  const stats = [
    { label: "Total registered", value: 2478 - (pendingSeed.length - pending.length), icon: Users, tone: "bg-blue-50 text-blue-600" },
    { label: "Pending approvals", value: pending.length, icon: Clock3, tone: "bg-amber-50 text-amber-600" },
    { label: "Approved alumni", value: 2341 + (pendingSeed.length - pending.length), icon: UserCheck, tone: "bg-teal-50 text-teal-600" },
    { label: "Active mentors", value: 187, icon: HeartHandshake, tone: "bg-violet-50 text-violet-600" },
    { label: "Published jobs", value: 64, icon: BriefcaseBusiness, tone: "bg-rose-50 text-rose-600" },
  ];
  return (
    <AppShell page="admin" setPage={setPage} admin>
      <div className="mx-auto max-w-[90rem]">
        {notice && <div className="fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl bg-navy-950 px-5 py-4 text-sm font-semibold text-white shadow-2xl"><CheckCircle2 className="size-5 text-teal-400" />{notice}</div>}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="text-sm font-semibold text-teal-700">Monday, May 26</div><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Good morning, Admin.</h1><p className="mt-2 text-sm text-slate-500">Here’s what’s happening in your alumni community today.</p></div><Button><Plus className="size-4" /> Create announcement</Button></div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{stats.map(({ label, value, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon className="size-5" /></span><div className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{value.toLocaleString()}</div><div className="mt-1 text-xs font-semibold text-slate-500">{label}</div></div>)}</div>
        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center"><div><h2 className="font-bold text-slate-950">Pending alumni approvals</h2><p className="mt-1 text-xs text-slate-400">Review and verify new alumni registrations.</p></div><div className="flex gap-2"><label className="relative"><Search className="absolute left-3 top-2.5 size-4 text-slate-400" /><input placeholder="Search pending..." className="w-44 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-500" /></label><Button disabled={!selected.length} onClick={() => setModal(true)}><Check className="size-4" /> Approve selected {selected.length > 0 && `(${selected.length})`}</Button></div></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead><tr className="bg-slate-50 text-[0.65rem] uppercase tracking-wider text-slate-400"><th className="p-4"><input type="checkbox" checked={allSelected} onChange={() => setSelected(allSelected ? [] : pending.map((person) => person.email))} className="size-4 accent-teal-600" /></th>{["Alumni", "Cohort", "Programme", "Registered", "Status", "Actions"].map((heading) => <th key={heading} className="p-4 font-bold">{heading}</th>)}</tr></thead>
                <tbody>{pending.map((person) => <tr key={person.email} className="border-t border-slate-100 text-sm"><td className="p-4"><input type="checkbox" checked={selected.includes(person.email)} onChange={() => setSelected(selected.includes(person.email) ? selected.filter((item) => item !== person.email) : [...selected, person.email])} className="size-4 accent-teal-600" /></td><td className="p-4"><div className="font-bold text-slate-900">{person.name}</div><div className="mt-0.5 text-xs text-slate-400">{person.email}</div></td><td className="p-4 text-slate-500">{person.year}</td><td className="p-4 text-slate-500">{person.program}</td><td className="p-4 text-xs text-slate-500">{person.date}</td><td className="p-4"><Pill tone="amber">Pending</Pill></td><td className="p-4"><div className="flex gap-1"><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900" title="View details"><CircleUserRound className="size-4" /></button><button onClick={() => { setSelected([person.email]); setModal(true); }} className="rounded-lg p-2 text-teal-600 hover:bg-teal-50" title="Approve"><Check className="size-4" /></button><button onClick={() => { setPending(pending.filter((item) => item.email !== person.email)); setNotice(`${person.name}'s registration was rejected.`); }} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" title="Reject"><X className="size-4" /></button></div></td></tr>)}</tbody>
              </table>
              {pending.length === 0 && <div className="p-12 text-center"><CheckCircle2 className="mx-auto size-9 text-teal-500" /><div className="mt-3 font-bold text-slate-900">All caught up</div><div className="mt-1 text-sm text-slate-400">There are no alumni profiles awaiting approval.</div></div>}
            </div>
          </section>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5"><PanelHeader title="Community health" action="Last 30 days" /><div className="mt-6 flex items-end gap-2">{[46, 62, 53, 78, 66, 90, 84].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-teal-400" style={{ height: `${height}px` }} /><span className="text-[0.6rem] text-slate-400">{["M", "T", "W", "T", "F", "S", "S"][index]}</span></div>)}</div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-500">Engagement rate</span><span className="text-sm font-bold text-teal-700">+14.2%</span></div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5"><PanelHeader title="Quick actions" action="" />{[{ icon: Users, label: "Manage alumni records" }, { icon: BriefcaseBusiness, label: "Review job postings" }, { icon: HeartHandshake, label: "Mentorship requests" }, { icon: Sparkles, label: "Update spotlight profiles" }].map(({ icon: Icon, label }) => <button key={label} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-950"><span className="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon className="size-4" /></span>{label}<ChevronRight className="ml-auto size-4 text-slate-300" /></button>)}</div>
          </aside>
        </div>
      </div>
      {modal && <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/50 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"><span className="grid size-12 place-items-center rounded-2xl bg-teal-50 text-teal-600"><FileCheck2 className="size-6" /></span><h2 className="mt-5 text-xl font-bold text-slate-950">Approve {selected.length} alumni {selected.length === 1 ? "profile" : "profiles"}?</h2><p className="mt-3 text-sm leading-6 text-slate-500">Approved alumni will immediately receive access to the directory, mentorship hub and opportunities board. They’ll also receive a confirmation email.</p><div className="mt-7 grid grid-cols-2 gap-3"><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={approve}><Check className="size-4" /> Confirm approval</Button></div></div></div>}
    </AppShell>
  );
}