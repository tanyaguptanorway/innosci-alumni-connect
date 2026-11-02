import { useState } from "react";
import {Avatar} from "./Picture";
import { Button, Pill } from "./components/ui";
import {GraduationCap, Check, Clock3, Link, UserRoundPlus, MapPin} from "lucide-react";
import type { Alumni } from "./App";

export function AlumniCard({ person }: { person: Alumni }) {
  const [status, setStatus] = useState<"idle" | "pending" | "connected">("idle");
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="h-20 bg-gradient-to-r from-navy-950 via-slate-800 to-teal-700" />
      <div className="-mt-10 px-5 pb-5"><Avatar src={person.image} name={person.name} className="size-20" /><div className="mt-4 flex items-start justify-between"><div><div className="text-lg font-bold text-slate-950">{person.name}</div><div className="mt-0.5 text-sm font-medium text-slate-600">{person.role}</div><div className="mt-1 text-xs text-slate-400">{person.company}</div></div><Link className="size-5 text-blue-600" /></div>
        <div className="mt-4 flex items-center gap-4 border-y border-slate-100 py-3 text-xs text-slate-500"><span className="flex items-center gap-1.5"><GraduationCap className="size-4 text-teal-600" /> Class of {person.year}</span><span className="flex items-center gap-1.5"><MapPin className="size-4 text-teal-600" /> {person.location.split(",")[0]}</span></div>
        <div className="mt-4 flex flex-wrap gap-2">{person.skills.slice(0, 3).map((skill) => <Pill key={skill} tone="slate">{skill}</Pill>)}</div>
        <div className="mt-5 grid grid-cols-2 gap-2"><Button variant="secondary">View profile</Button><Button onClick={() => setStatus(status === "idle" ? "pending" : status === "pending" ? "connected" : "idle")} variant={status === "connected" ? "secondary" : "primary"}>{status === "idle" ? <><UserRoundPlus className="size-4" /> Connect</> : status === "pending" ? <><Clock3 className="size-4" /> Pending</> : <><Check className="size-4" /> Connected</>}</Button></div>
      </div>
    </div>
  );
}