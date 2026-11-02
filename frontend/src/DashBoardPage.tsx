import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CircleUserRound,
  Plus,
  TrendingUp,
  Users,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { AppShell } from "./AppShell";
import { Button, Pill } from "./components/ui";
import {Avatar} from "./Picture";
import {PanelHeader} from "./PanelHeader";
import type { Alumni, Page } from "./App";

import data from "../../content/alumni.json";
const {
  alumnis,
  job,
  pics,
} = data;

const photos = pics;

const alumni: Alumni[] = alumnis;

const jobs = job;

export function ConnectionRow({ person }: { person: Alumni }) {
  const [connected, setConnected] = useState(false);
  return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Avatar src={person.image} name={person.name} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-slate-900">{person.name}</div><div className="truncate text-xs text-slate-400">{person.role}</div></div><button onClick={() => setConnected(!connected)} className={`grid size-9 place-items-center rounded-xl ${connected ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-700"}`}>{connected ? <Check className="size-4" /> : <Plus className="size-4" />}</button></div>;
}

export function JobRow({ job }: { job: (typeof jobs)[number] }) {
  return <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 md:flex-row md:items-center"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"><Building2 className="size-5" /></span><div><div className="font-bold text-slate-950">{job.title}</div><div className="mt-1 text-sm text-slate-500">{job.company} · {job.location}</div><div className="mt-2 flex gap-2"><Pill tone="blue">{job.type}</Pill><span className="text-xs text-slate-400">{job.date}</span></div></div></div><Button variant="secondary">View role <ArrowRight className="size-4" /></Button></div>;
}

export function DashboardPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <AppShell page="dashboard" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white md:p-9">
          <div className="hero-grid absolute inset-0 opacity-20" /><div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="flex items-center gap-5"><Avatar src={photos[0]} name="Amara Okafor" className="size-20 md:size-24" /><div><Pill>Verified alumna</Pill><h1 className="mt-3 text-3xl font-bold">Welcome back, Amara.</h1><p className="mt-2 text-sm text-slate-300">Your community has been busy. Here’s what’s new.</p></div></div>
            <Button className="bg-white text-slate-950 hover:bg-slate-100">Edit my profile <CircleUserRound className="size-4" /></Button>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[{ label: "Profile views", value: "128", delta: "+18%", icon: TrendingUp }, { label: "Connections", value: "246", delta: "+12 this month", icon: Users }, { label: "Unread messages", value: "08", delta: "3 new today", icon: MessageCircle }].map(({ label, value, delta, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600"><Icon className="size-5" /></span><Pill>{delta}</Pill></div><div className="mt-5 text-3xl font-bold text-slate-950">{value}</div><div className="mt-1 text-sm text-slate-500">{label}</div></div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <PanelHeader title="Latest opportunities" action="View all jobs" onClick={() => setPage("jobs")} />
            <div className="grid gap-4">
              {jobs.slice(0, 2).map((job) => <JobRow key={job.title} job={job} />)}
            </div>
            <PanelHeader title="Recent alumni updates" action="Explore directory" onClick={() => setPage("directory")} />
            <div className="rounded-2xl border border-slate-200 bg-white">
              {[alumni[1], alumni[2]].map((person, index) => <div key={person.name} className={`flex gap-4 p-5 ${index === 0 ? "border-b border-slate-100" : ""}`}><Avatar src={person.image} name={person.name} /><div><div className="text-sm text-slate-600"><strong className="text-slate-900">{person.name}</strong> {index === 0 ? "started a new role as Senior Software Engineer at Flutterwave." : "is celebrating 5 years in the data industry."}</div><div className="mt-2 text-xs text-slate-400">{index === 0 ? "3 hours ago" : "Yesterday"}</div></div></div>)}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <PanelHeader title="Profile strength" action="80%" />
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-4/5 rounded-full bg-teal-500" /></div>
              <div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-teal-600"><Plus className="size-4" /></span><div><div className="text-sm font-bold text-slate-900">Add a professional bio</div><p className="mt-1 text-xs leading-5 text-slate-500">Profiles with a bio receive 2× more connection requests.</p></div></div></div>
            </div>
            <div>
              <PanelHeader title="Suggested connections" action="See all" onClick={() => setPage("directory")} />
              <div className="space-y-3">{alumni.slice(1, 4).map((person) => <ConnectionRow key={person.name} person={person} />)}</div>
            </div>
            <div>
              <PanelHeader title="Mentorship" action="View hub" onClick={() => setPage("mentorship")} />
              <div className="rounded-2xl bg-teal-600 p-5 text-white"><CalendarDays className="size-6 text-teal-200" /><div className="mt-4 font-bold">Cloud careers circle</div><p className="mt-2 text-xs leading-5 text-teal-50/80">Thursday, 6:00 PM · Online<br />12 alumni attending</p><Button className="mt-4 w-full bg-white text-teal-800 hover:bg-teal-50">View event</Button></div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}