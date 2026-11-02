import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Link,
  LockKeyhole,
  Mail,
  MapPin,
  Upload,
} from "lucide-react";
import { Field, SelectField } from "./components/Fields";
import { Button, Pill } from "./components/ui";
import type { Page } from "./App";

export default function RegistrationPage({ setPage }: { setPage: (page: Page) => void }) {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);

    const password = String(data.get("password") ?? "");
    if (password !== String(data.get("confirmPassword") ?? "")) {
      setError("Passwords do not match.");
      return;
    }

    const graduationYear = Number(data.get("graduationYear"));
    if (Number.isNaN(graduationYear)) {
      setError("Please select your graduation year / cohort.");
      return;
    }

    const program = String(data.get("program") ?? "");
    if (!program || program.startsWith("Select")) {
      setError("Please select the programme you completed.");
      return;
    }

    const body = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      contactNumber: data.get("contactNumber"),
      location: data.get("location"),
      graduationYear,
      program,
      jobTitle: data.get("jobTitle"),
      company: data.get("company"),
      linkedinUrl: data.get("linkedinUrl"),
      skills: data.get("skills"),
      interests: data.get("interests"),
      password,
      consent: data.get("consent") === "on",
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 409) {
        setError("This email is already registered.");
        return;
      }
      if (!res.ok) {
        setError("Registration failed. Please check your details and try again.");
        return;
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
       console.log("API URL:", import.meta.env.VITE_API_URL);
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="grid min-h-[calc(100vh-5rem)] place-items-center bg-slate-50 px-5 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 md:p-12">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-teal-50 text-teal-600"><CheckCircle2 className="size-10" /></span>
          <div className="mt-7 text-3xl font-bold tracking-tight text-slate-950">Registration Successful!</div>
          <p className="mt-4 leading-7 text-slate-500">Your profile is awaiting approval from the InnoSCI administration team.</p>
          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700"><Clock3 className="size-4" /> Status: Pending</div>
          <p className="mt-7 text-sm leading-6 text-slate-400">We’ll email you as soon as your profile has been reviewed. This usually takes 1–2 business days.</p>
          <Button className="mt-8 w-full" onClick={() => setPage("home")}>Return to homepage</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-9">
          <button onClick={() => setPage("home")} className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to home</button>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><Pill>Alumni registration</Pill><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Welcome back to InnoSCI.</h1><p className="mt-3 max-w-2xl text-slate-500">Tell us where your journey has taken you. Your information helps us verify your alumni status and tailor your community experience.</p></div>
            <div className="flex items-center gap-3 text-sm text-slate-500"><span className="grid size-9 place-items-center rounded-full bg-teal-500 font-bold text-white">1</span><span className="font-semibold text-slate-800">Profile details</span><span className="h-px w-8 bg-slate-200" /><span className="grid size-9 place-items-center rounded-full bg-slate-200 font-bold">2</span><span>Approval</span></div>
          </div>
        </div>
       
        <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600"><CircleUserRound className="size-5" /></span><div><div className="font-bold text-slate-950">Personal information</div><div className="text-xs text-slate-400">Help fellow alumni recognise you.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="fullName" placeholder="e.g. Amara Okafor" required />
              <Field label="Email Address" name="email" placeholder="you@email.com" type="email" icon={Mail} required />
              <Field label="Contact Number" name="contactNumber" placeholder="+234 000 000 0000" required />
              <Field label="Location" name="location" placeholder="City, Country" icon={MapPin} required />
              <SelectField label="Graduation Year / Cohort" name="graduationYear" options={["Select your cohort", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]} />
              <SelectField label="Programme Completed" name="program" options={["Select programme", "Cloud Computing", "Software Development", "Data Analytics", "Project Management", "Cybersecurity"]} />
            </div>
          </div>
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><BriefcaseBusiness className="size-5" /></span><div><div className="font-bold text-slate-950">Professional profile</div><div className="text-xs text-slate-400">Share what you do and what energises you.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Current Job Title" name="jobTitle" placeholder="e.g. Cloud Solutions Architect" />
              <Field label="Company" name="company" placeholder="Your organisation" icon={Building2} />
              <Field label="LinkedIn Profile URL" name="linkedinUrl" placeholder="linkedin.com/in/yourname" icon={Link} />
              <Field label="Skills and Expertise" name="skills" placeholder="AWS, Leadership, Data..." />
              <Field label="Areas of Interest" name="interests" placeholder="Mentorship, networking..." />
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Profile Picture</span><span className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-500 transition hover:border-teal-400 hover:bg-teal-50/50"><Upload className="size-5 text-teal-600" /> Upload JPG or PNG<input type="file" accept="image/*" className="hidden" /></span></label>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600"><LockKeyhole className="size-5" /></span><div><div className="font-bold text-slate-950">Secure your account</div><div className="text-xs text-slate-400">Use at least 8 characters.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2"><Field label="Password" name="password" placeholder="Create password" type="password" required /><Field label="Confirm Password" name="confirmPassword" placeholder="Repeat password" type="password" required /></div>
            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-500"><input type="checkbox" name="consent" required className="mt-1 size-4 accent-teal-600" /><span>I agree to the community guidelines and consent to my approved profile being visible to verified InnoSCI alumni.</span></label>
            {error && <p className="mt-6 text-sm font-semibold text-red-600">{error}</p>}
            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={submitting} className="w-full px-7 md:w-auto">Submit registration <ArrowRight className="size-4" /></Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}