import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ListFilter, Search, UserRoundPlus } from "lucide-react";

import { AppShell } from "./AppShell";
import { AlumniCard } from "./AlumniCard";
import { Button, Pill } from "./components/ui";
import { useAuth } from "./AuthContext";
import { apiFetch } from "./api";

import type { Alumni, DirectoryScope, Page } from "./App";
import { CareerAssistant } from "./CareerAssistant";
type DirectoryUser = {
  user_id: string;
  full_name: string;
  job_title: string | null;
  company: string | null;
  location: string | null;
  program: string | null;
  graduation_year: number | null;
  skills: string | null;
  profile_picture_url: string | null;
};

function toAlumni(u: DirectoryUser): Alumni {
  return {
    name: u.full_name,
    year: u.graduation_year ? String(u.graduation_year) : "",
    role: u.job_title ?? "",
    company: u.company ?? "",
    location: u.location ?? "",
    skills: (u.skills ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    image: u.profile_picture_url ?? "",
    program: u.program ?? "",
  };
}

export function DirectoryPage({ setPage, initialScope = "all" }: { setPage: (page: Page) => void; initialScope?: DirectoryScope }) {
  const { me } = useAuth();
  const [people, setPeople] = useState<{ id: string; person: Alumni }[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [scope, setScope] = useState<DirectoryScope>(initialScope);
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("All programmes");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/directory");
        if (!res.ok) throw new Error();
        const body: { users: DirectoryUser[] } = await res.json();
        setPeople(body.users.map((u) => ({ id: u.user_id, person: toAlumni(u) })));
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const myProgram = me?.program ?? "";
  const myYear = me?.graduation_year ? String(me.graduation_year) : "";

  const matchesScope = (person: Alumni, which: DirectoryScope) => {
    if (which === "program") return !!myProgram && person.program === myProgram;
    if (which === "cohort") return !!myYear && person.year === myYear;
    return true;
  };

  const counts = useMemo(
    () => ({
      all: people.length,
      program: people.filter(({ person }) => matchesScope(person, "program")).length,
      cohort: people.filter(({ person }) => matchesScope(person, "cohort")).length,
    }),
    [people, myProgram, myYear],
  );

  const tabs: { key: DirectoryScope; label: string }[] = [
    { key: "all", label: "All alumni" },
    { key: "program", label: "My programme" },
    { key: "cohort", label: "My cohort" },
  ];

  const filtered = people.filter(({ person }) =>
    matchesScope(person, scope) &&
    `${person.name} ${person.role} ${person.company} ${person.location} ${person.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase()) &&
    (program === "All programmes" || person.program === program),
  );

  return (
    <AppShell page="directory" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Pill>{loading ? "Loading alumni..." : `${people.length + 1} verified members`}</Pill>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Find your people.</h1>
            <p className="mt-2 text-sm text-slate-500">Search by name, skills, programme or the work alumni do today.</p>
          </div>
          <Button disabled><UserRoundPlus className="size-4" /> My connection requests 
          {/* <Pill tone="slate">3</Pill> */}
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setScope(tab.key)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${scope === tab.key ? "border-transparent bg-navy-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}
            >
              {tab.label} <span className="ml-1 opacity-70">{counts[tab.key]}</span>
            </button>
          ))}
        </div>
          {me?.role === "ALUMNI" && <CareerAssistant />}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_160px]">
            <label className="relative"><Search className="absolute left-4 top-3.5 size-5 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, company or skill..." className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
            <label className="relative"><select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"><option>All programmes</option>{["Cloud Computing", "Software Development", "Data Analytics", "Project Management", "Cybersecurity"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-slate-400" /></label>
            <Button variant="secondary"><ListFilter className="size-4" /> More filters</Button>
          </div>
        </div>

        <div className="mt-6 text-sm font-semibold text-slate-500">Showing <span className="text-slate-950">{filtered.length}</span> alumni</div>

        {loadError && <p className="mt-4 text-sm text-slate-500">Could not load the directory right now. Please try again.</p>}
        {!loading && !loadError && filtered.length === 0 && <p className="mt-4 text-sm text-slate-500">No alumni match this view yet.</p>}

        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(({ id, person }) => <AlumniCard key={id} person={person} />)}
        </div>
      </div>
    </AppShell>
  );  
}