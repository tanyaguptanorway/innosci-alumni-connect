import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Cloud,
  Code2,
  HeartHandshake,
  Plus,
  Search,
  ShieldCheck,
  Target,
  TrendingUp
} from "lucide-react";

import { AppShell } from "./AppShell";
import { Avatar } from "./Picture";
import { Button, Pill } from "./components/ui";

import {SelectField} from "./components/Fields";
import type { Alumni, Page } from "./App";

import data from "../../content/alumni.json";
const {
  alumnis,
} = data;

const alumni: Alumni[] = alumnis;

export function MentorshipPage({ setPage }: { setPage: (page: Page) => void }) {
  const [tab, setTab] = useState("Find a mentor");
  const [requests, setRequests] = useState<Record<string, string>>({});
  return (
    <AppShell page="mentorship" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-navy-950 p-7 text-white md:p-10"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-300"><HeartHandshake className="size-4" /> Mentorship hub</div><h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight">Experience shared is potential unlocked.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">Learn from someone who has navigated the path—or be the person who helps another alum take their next confident step.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button className="bg-white text-navy-950 hover:bg-slate-100"><Search className="size-4" /> Find a mentor</Button><Button variant="secondary" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Plus className="size-4" /> Become a mentor</Button></div></div></div>
        <div className="mt-7 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2">{["Find a mentor", "My requests", "Become a mentor"].map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${tab === item ? "bg-navy-950 text-white" : "text-slate-500 hover:bg-slate-50"}`}>{item}{item === "My requests" && <span className="ml-2 rounded-full bg-teal-500 px-2 py-0.5 text-[0.65rem] text-white">2</span>}</button>)}</div>
        {tab === "Find a mentor" && <>
          <div className="mt-7 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-xl font-bold text-slate-950">Recommended mentors</h2><p className="mt-1 text-sm text-slate-500">Matched to your interests and professional goals.</p></div><div className="flex gap-2"><button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">All expertise <ChevronDown className="ml-2 inline size-4" /></button><button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">Availability <ChevronDown className="ml-2 inline size-4" /></button></div></div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{alumni.map((person, index) => {
            const status = requests[person.name];
            const icons = [Cloud, Code2, TrendingUp, Target, ShieldCheck];
            const ExpertiseIcon = icons[index];
            return <div key={person.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><Avatar src={person.image} name={person.name} className="size-16" /><span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600"><ExpertiseIcon className="size-5" /></span></div><div className="mt-4 text-lg font-bold text-slate-950">{person.name}</div><div className="mt-1 text-sm font-semibold text-teal-700">{person.program}</div><div className="mt-1 text-xs text-slate-400">{person.role} at {person.company}</div><p className="mt-4 text-sm leading-6 text-slate-500">Offering guidance in {person.skills.join(", ")} and navigating meaningful career transitions.</p><div className="mt-4 flex flex-wrap gap-2">{person.skills.slice(0, 2).map((skill) => <Pill key={skill} tone="slate">{skill}</Pill>)}</div><Button className="mt-5 w-full" variant={status ? "secondary" : "primary"} onClick={() => setRequests({ ...requests, [person.name]: status ? "" : "Pending" })}>{status ? <><Clock3 className="size-4" /> Request pending</> : <><HeartHandshake className="size-4" /> Request mentorship</>}</Button></div>;
          })}</div>
        </>}
        {tab === "My requests" && <div className="mt-7 grid gap-4 md:grid-cols-3">{[{ person: alumni[3], status: "Accepted", tone: "teal" as const }, { person: alumni[4], status: "Pending", tone: "amber" as const }, { person: alumni[1], status: "Completed", tone: "slate" as const }].map(({ person, status, tone }) => <div key={person.name} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><Avatar src={person.image} name={person.name} /><div><div className="text-sm font-bold text-slate-950">{person.name}</div><div className="text-xs text-slate-400">{person.program}</div></div></div><div className="mt-5 flex items-center justify-between"><span className="text-xs text-slate-400">Mentorship request</span><Pill tone={tone}>{status}</Pill></div></div>)}</div>}
        {tab === "Become a mentor" && <div className="mx-auto mt-7 max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-50 text-teal-600"><HeartHandshake className="size-8" /></span><h2 className="mt-6 text-2xl font-bold text-slate-950">Your experience can change a career.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Choose the areas you can support, set your availability and we’ll introduce you to alumni ready to learn.</p><div className="mt-6 grid gap-4 text-left sm:grid-cols-2"><SelectField label="Mentorship area" name="mentorshipArea" options={["Select expertise", "Cloud Computing", "Software Development", "Data Analytics", "Leadership"]} /><SelectField label="Monthly availability" name="monthlyAvailability" options={["2 hours", "4 hours", "6 hours", "8+ hours"]} /></div><Button className="mt-6">Create mentor profile <ArrowRight className="size-4" /></Button></div>}
      </div>
    </AppShell>
  );
}