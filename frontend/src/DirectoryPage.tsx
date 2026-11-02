import {useState} from "react";
import {ChevronDown, ListFilter, Search, UserRoundPlus} from "lucide-react";

import {AppShell} from "./AppShell";
import {AlumniCard} from "./AlumniCard";
import {Button, Pill} from "./components/ui";

import type { Alumni, Page } from "./App";
import data from "../../content/alumni.json";
const {
  alumnis,
} = data;

const alumni: Alumni[] = alumnis;

export function DirectoryPage({ setPage }: { setPage: (page: Page) => void }) {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("All programmes");
  const filtered = alumni.filter((person) => `${person.name} ${person.role} ${person.company} ${person.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (program === "All programmes" || person.program === program));
  return (
    <AppShell page="directory" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><Pill>2,400+ verified members</Pill><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Find your people.</h1><p className="mt-2 text-sm text-slate-500">Search by name, skills, programme or the work alumni do today.</p></div><Button><UserRoundPlus className="size-4" /> My connection requests <Pill tone="slate">3</Pill></Button></div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_160px]">
            <label className="relative"><Search className="absolute left-4 top-3.5 size-5 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, company or skill..." className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
            <label className="relative"><select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"><option>All programmes</option>{["Cloud Computing", "Software Development", "Data Analytics", "Project Management", "Cybersecurity"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-slate-400" /></label>
            <Button variant="secondary"><ListFilter className="size-4" /> More filters</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">{["Graduation year", "Location", "Industry", "Skills"].map((filter) => <button key={filter} className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100">{filter}<ChevronDown className="size-3" /></button>)}</div>
        </div>
        <div className="mt-6 flex items-center justify-between"><div className="text-sm font-semibold text-slate-500">Showing <span className="text-slate-950">{filtered.length}</span> alumni</div><button className="flex items-center gap-2 text-xs font-semibold text-slate-500">Sort: Most relevant <ChevronDown className="size-3" /></button></div>
        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((person) => <AlumniCard key={person.name} person={person} />)}
        </div>
      </div>
    </AppShell>
  );
}
