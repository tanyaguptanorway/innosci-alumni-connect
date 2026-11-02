import {useState} from "react";
import {ArrowRight, BriefcaseBusiness, Building2, Check, Clock3, MapPin, Plus, Sparkles, Search} from "lucide-react";

import {AppShell} from "./AppShell";
import {Button, Pill} from "./components/ui";
import type { Page } from "./App";
import data from "../../content/alumni.json";
const {
  job,
} = data;

const jobs = job;

export function JobsPage({ setPage }: { setPage: (page: Page) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [applied, setApplied] = useState<string[]>([]);
  const filtered = jobs.filter((job) => (category === "All" || job.category === category) && `${job.title} ${job.company}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <AppShell page="jobs" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Pill>Career opportunities</Pill><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Make your next move.</h1><p className="mt-2 text-sm text-slate-500">Alumni-powered roles, programmes and events from organisations we trust.</p></div><Button><Plus className="size-4" /> Share an opportunity</Button></div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4"><div className="flex flex-col gap-3 lg:flex-row"><label className="relative flex-1"><Search className="absolute left-4 top-3.5 size-5 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search role or company..." className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label><div className="flex flex-wrap gap-2">{["All", "Cloud", "Engineering", "Data", "Events"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${category === item ? "bg-navy-950 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>{item}</button>)}</div></div></div>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_280px]"><div className="space-y-4">{filtered.map((job) => <div key={job.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200"><div className="flex flex-col justify-between gap-5 md:flex-row"><div className="flex gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-navy-950 text-white"><Building2 className="size-6" /></span><div><div className="text-lg font-bold text-slate-950">{job.title}</div><div className="mt-1 text-sm font-semibold text-slate-600">{job.company}</div><div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400"><span className="flex items-center gap-1"><MapPin className="size-3.5" />{job.location}</span><span className="flex items-center gap-1"><BriefcaseBusiness className="size-3.5" />{job.type}</span><span className="flex items-center gap-1"><Clock3 className="size-3.5" />{job.date}</span></div></div></div><Pill tone="blue">{job.category}</Pill></div><p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-500">{job.description}</p><div className="mt-5 flex items-center justify-between"><button className="text-sm font-semibold text-slate-500 hover:text-slate-900">Save for later</button><Button onClick={() => setApplied([...applied, job.title])} variant={applied.includes(job.title) ? "secondary" : "primary"}>{applied.includes(job.title) ? <><Check className="size-4" /> Applied</> : <>Apply now <ArrowRight className="size-4" /></>}</Button></div></div>)}</div>
          <aside className="space-y-5"><div className="rounded-2xl bg-navy-950 p-6 text-white"><Sparkles className="size-6 text-teal-300" /><div className="mt-5 text-lg font-bold">Turn on job alerts</div><p className="mt-2 text-xs leading-5 text-slate-300">Get a weekly round-up tailored to your skills and interests.</p><Button className="mt-5 w-full bg-white text-navy-950 hover:bg-slate-100">Create alert</Button></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="font-bold text-slate-950">Popular searches</div><div className="mt-4 flex flex-wrap gap-2">{["Remote", "Graduate", "AWS", "Product", "Analytics", "Internship"].map((item) => <button key={item} onClick={() => setQuery(item)} className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-teal-50 hover:text-teal-700">{item}</button>)}</div></div></aside>
        </div>
      </div>
    </AppShell>
  );
}