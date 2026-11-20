import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, CircleUserRound, GraduationCap, Plus, Users } from "lucide-react";
import { AppShell } from "./AppShell";
import { Pill } from "./components/ui";
import { Avatar } from "./Picture";
import { PanelHeader } from "./PanelHeader";
import { useAuth } from "./AuthContext";
import { apiFetch } from "./api";
import type { Alumni, DirectoryScope, Page } from "./App";

import { EditProfileModal } from "./EditProfileModal";
import { CareerAssistant } from "./CareerAssistant";

export function ConnectionRow({ person }: { person: Alumni }) {
  const [connected, setConnected] = useState(false);
  return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Avatar src={person.image} name={person.name} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-slate-900">{person.name}</div><div className="truncate text-xs text-slate-400">{person.role}</div></div><button onClick={() => setConnected(!connected)} className={`grid size-9 place-items-center rounded-xl ${connected ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-700"}`}>{connected ? <Check className="size-4" /> : <Plus className="size-4" />}</button></div>;
}

type Suggested = {
  user_id: string;
  full_name: string;
  job_title: string | null;
  company: string | null;
  program: string | null;
  graduation_year: number | null;
  profile_picture_url: string | null;
  reasons: string[];
};

type DashboardData = {
  stats: { network_size: number; same_program: number; same_cohort: number };
  suggested: Suggested[];
};

function SuggestedRow({ person }: { person: Suggested }) {
  const [connected, setConnected] = useState(false);
  const subtitle = [person.job_title, person.company].filter(Boolean).join(" at ") || person.program || "InnoSCI alumni";
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <Avatar src={person.profile_picture_url} name={person.full_name} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-slate-900">{person.full_name}</div>
        <div className="truncate text-xs text-slate-400">{subtitle}</div>
        {person.reasons[0] && <div className="truncate text-[0.7rem] font-semibold text-teal-700">{person.reasons[0]}</div>}
      </div>
      <button onClick={() => setConnected(!connected)} className={`grid size-9 place-items-center rounded-xl ${connected ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-700"}`}>
        {connected ? <Check className="size-4" /> : <Plus className="size-4" />}
      </button>
    </div>
  );
}

export function DashboardPage({ setPage, openDirectory }: { setPage: (page: Page) => void; openDirectory: (scope: DirectoryScope) => void }) {
  const { me } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const load = async () => {
    try {
      const res = await apiFetch("/dashboard");
      if (!res.ok) throw new Error();
      setDashboard(await res.json());
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const firstName = me?.full_name?.split(" ")[0] ?? "";

  const filled = (v?: string | null) => !!v && v.trim().length > 0;
  const checks = [
    { label: "Full name", done: filled(me?.full_name) },
    { label: "Email address", done: filled(me?.email) },
    { label: "Contact number", done: filled(me?.phone) },
    { label: "Location", done: filled(me?.location) },
    { label: "Graduation year", done: !!me?.graduation_year },
    { label: "Programme completed", done: filled(me?.program) },
    { label: "Job title", done: filled(me?.job_title) },
    { label: "Company", done: filled(me?.company) },
    { label: "LinkedIn profile", done: filled(me?.linkedin_url) },
    { label: "Skills and expertise", done: filled(me?.skills) },
    { label: "Areas of interest", done: filled(me?.interests) },
    // Add this line once picture upload works:
    // { label: "Profile picture", done: filled(me?.profile_picture_url) },
  ];
  const percent = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);
  const nextStep = checks.find((c) => !c.done);

  const stats: { label: string; value: number | undefined; icon: typeof Users; scope: DirectoryScope }[] = [
  { label: "Alumni in the network", value: dashboard?.stats.network_size, icon: Users, scope: "all" },
  { label: "From your programme", value: dashboard?.stats.same_program, icon: GraduationCap, scope: "program" },
  { label: "In your cohort", value: dashboard?.stats.same_cohort, icon: CalendarDays, scope: "cohort" },
];

  return (
    <AppShell page="dashboard" setPage={setPage}>
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white md:p-9">
          <div className="hero-grid absolute inset-0 opacity-20" /><div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <Avatar src={me?.profile_picture_url} name={me?.full_name ?? ""} className="size-20 md:size-24" />
              <div>
                <Pill>Verified alumni</Pill>
                <h1 className="mt-3 text-3xl font-bold">Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
                <p className="mt-2 text-sm text-slate-300">Your community has been busy. Here’s what’s new.</p>
              </div>
            </div>
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-teal-50">
              Edit my profile <CircleUserRound className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, scope }) => (
            <button key={label} type="button" onClick={() => openDirectory(scope)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-300 hover:shadow-md">
            <span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600"><Icon className="size-5" /></span>
            <span className="mt-5 block text-3xl font-bold text-slate-950">{value ?? "–"}</span>
            <span className="mt-1 flex items-center justify-between text-sm text-slate-500">{label}<ArrowRight className="size-4 text-slate-300" /></span>
          </button>
        ))}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div
            role="button"
            tabIndex={0}
            onClick={() => setEditing(true)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setEditing(true); }}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-300 hover:shadow-md"
          >
            <PanelHeader title="Profile strength" action={`${percent}%`} />
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500" style={{ width: `${percent}%` }} /></div>
            {nextStep ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-teal-600"><Plus className="size-4" /></span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Next: add your {nextStep.label.toLowerCase()}</div>
                    <div className="mt-1 text-xs font-semibold text-teal-700">Click to edit your profile</div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm font-semibold text-teal-700">Your profile is complete. Nice work.</p>
            )}
          </div>
            <div>
              <PanelHeader title="Suggested connections" action="See all" onClick={() => setPage("directory")} />
              <div className="space-y-3">
                {loadError && <p className="text-sm text-slate-500">Could not load suggestions right now.</p>}
                {dashboard && dashboard.suggested.length === 0 && <p className="text-sm text-slate-500">More alumni will appear here as the network grows.</p>}
                {dashboard?.suggested.map((person) => <SuggestedRow key={person.user_id} person={person} />)}
              </div>
            </div>
            {/* <div>
              <PanelHeader title="Mentorship" action="View hub" onClick={() => setPage("mentorship")} />
              <div className="rounded-2xl bg-teal-600 p-5 text-white"><CalendarDays className="size-6 text-teal-200" /><div className="mt-4 font-bold">Cloud careers circle</div><p className="mt-2 text-xs leading-5 text-teal-50/80">Thursday, 6:00 PM · Online<br />12 alumni attending</p><Button onClick={() => setPage("mentorship")} className="mt-4 w-full bg-teal-500 text-teal-800 hover:bg-white hover:text-black">View event</Button></div>
            </div> */}
          </div>
        </div>
        {me?.role === "ALUMNI" && <CareerAssistant />}
      </div>
      {editing && <EditProfileModal onClose={() => setEditing(false)} onSaved={load} />}
    </AppShell>
  );
}