import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Cloud,
  Code2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  Link,
  ListFilter,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserCheck,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Page =
  | "home"
  | "register"
  | "dashboard"
  | "directory"
  | "mentorship"
  | "jobs"
  | "admin";

type Alumni = {
  name: string;
  year: string;
  role: string;
  company: string;
  location: string;
  skills: string[];
  image: string;
  program: string;
};

const photos = [
  "https://images.unsplash.com/photo-1666867540898-aaa1993ffabc?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1563132337-f159f484226c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1649532354755-d6e6ba515703?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1573497491207-618cc224f243?auto=format&fit=crop&w=900&q=85",
];

const alumni: Alumni[] = [
  {
    name: "Amara Okafor",
    year: "2018",
    role: "Cloud Solutions Architect",
    company: "Amazon Web Services",
    location: "Lagos, Nigeria",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    image: photos[0],
    program: "Cloud Computing",
  },
  {
    name: "Kwame Mensah",
    year: "2019",
    role: "Senior Software Engineer",
    company: "Flutterwave",
    location: "Accra, Ghana",
    skills: ["React", "Node.js", "FinTech"],
    image: photos[1],
    program: "Software Development",
  },
  {
    name: "Zuri Adesina",
    year: "2020",
    role: "Data Analytics Lead",
    company: "Andela",
    location: "Nairobi, Kenya",
    skills: ["Python", "Tableau", "AI"],
    image: photos[2],
    program: "Data Analytics",
  },
  {
    name: "Tariq Bello",
    year: "2017",
    role: "Technical Programme Manager",
    company: "Microsoft",
    location: "London, UK",
    skills: ["Agile", "Leadership", "Azure"],
    image: photos[3],
    program: "Project Management",
  },
  {
    name: "Nia Boateng",
    year: "2021",
    role: "Cybersecurity Consultant",
    company: "Deloitte",
    location: "Toronto, Canada",
    skills: ["Security", "Risk", "Governance"],
    image: photos[4],
    program: "Cybersecurity",
  },
];

const spotlights = alumni.map((person, index) => ({
  ...person,
  story: [
    "Amara designs resilient cloud systems that help high-growth startups scale across Africa.",
    "Kwame turned an InnoSCI capstone into a career building products used by millions.",
    "Zuri leads a distributed data team turning complex insights into inclusive products.",
    "Tariq has delivered transformation programmes across three continents.",
    "Nia helps organisations build trusted digital infrastructure and safer customer experiences.",
  ][index],
  quote: [
    "Stay curious. The cloud has no ceiling.",
    "Build with empathy, then build for scale.",
    "Data becomes powerful when everyone can understand it.",
    "Progress begins when the whole team sees the vision.",
    "Security is ultimately about protecting people.",
  ][index],
}));

const jobs = [
  {
    title: "Cloud Support Engineer",
    company: "NovaStack Africa",
    location: "Lagos · Hybrid",
    type: "Full-time",
    category: "Cloud",
    date: "2 days ago",
    description: "Help ambitious teams build, operate and optimise secure cloud infrastructure.",
  },
  {
    title: "Graduate Software Developer",
    company: "Kora Digital",
    location: "Accra · Remote",
    type: "Graduate programme",
    category: "Engineering",
    date: "4 days ago",
    description: "Join a 12-month engineering rotation and ship products with senior mentors.",
  },
  {
    title: "Data Analyst Intern",
    company: "InsightBridge",
    location: "Nairobi · Hybrid",
    type: "Internship",
    category: "Data",
    date: "1 week ago",
    description: "Translate customer and market data into clear stories for growing businesses.",
  },
  {
    title: "Women in Tech Networking Night",
    company: "InnoSCI Community",
    location: "Online",
    type: "Networking",
    category: "Events",
    date: "1 week ago",
    description: "Meet alumni leaders, exchange ideas and grow your professional circle.",
  },
];

const pendingSeed = [
  { name: "Chidera Eze", email: "chidera.eze@email.com", year: "2024", program: "Cloud Computing", date: "May 24, 2025" },
  { name: "Malik Owusu", email: "malik.owusu@email.com", year: "2023", program: "Software Development", date: "May 23, 2025" },
  { name: "Lerato Ndlovu", email: "lerato.n@email.com", year: "2022", program: "Data Analytics", date: "May 22, 2025" },
  { name: "Idris Kamara", email: "idris.k@email.com", year: "2024", program: "Cybersecurity", date: "May 21, 2025" },
];

const pageLabels: Record<Page, string> = {
  home: "Home",
  register: "Registration",
  dashboard: "My Dashboard",
  directory: "Alumni Directory",
  mentorship: "Mentorship",
  jobs: "Job Opportunities",
  admin: "Admin Console",
};

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const styles = {
    primary: "bg-teal-500 text-white shadow-sm shadow-teal-900/10 hover:bg-teal-400",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
    danger: "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center rounded-lg bg-white px-2 py-1.5 text-left"
      aria-label="InnoSCI Alumni Connect home"
    >
      <img
        src="/src/assets/innoSciLogo.png"
        alt="InnoSCI School of Programming"
        className={compact ? "h-9 w-auto" : "h-11 w-auto"}
      />
    </button>
  );
}

function Avatar({ src, name, className = "size-11" }: { src: string; name: string; className?: string }) {
  return <img src={src} alt={`${name} profile`} className={`${className} shrink-0 rounded-full object-cover ring-2 ring-white`} />;
}

function Field({
  label,
  placeholder,
  type = "text",
  icon: Icon,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-teal-600">*</span>}
      </span>
      <span className="relative block">
        {Icon && <Icon className="absolute left-3.5 top-3.5 size-4 text-slate-400" />}
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${Icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </span>
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <span className="relative block">
        <select className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-slate-400" />
      </span>
    </label>
  );
}

function Pill({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "amber" | "slate" | "blue" }) {
  const colors = {
    teal: "bg-teal-50 text-teal-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[tone]}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">{eyebrow}</div>
      <div className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</div>
      <p className="mt-4 text-base leading-7 text-slate-500">{description}</p>
    </div>
  );
}

function PublicHeader({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Directory", page: "directory" },
    { label: "Mentorship", page: "mentorship" },
    { label: "Jobs", page: "jobs" },
  ];
  const navigate = (destination: Page) => {
    setPage(destination);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <span onClick={() => navigate("home")}><Logo /></span>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${page === link.page ? "bg-slate-100 text-slate-950" : "text-slate-500 hover:text-slate-950"}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" onClick={() => navigate("dashboard")}>Login</Button>
          <Button onClick={() => navigate("register")}>Join the network <ArrowRight className="size-4" /></Button>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl bg-slate-100 lg:hidden" aria-label="Open navigation">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
          {links.map((link) => (
            <button key={link.page} onClick={() => navigate(link.page)} className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {link.label}
            </button>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => navigate("dashboard")}>Login</Button>
            <Button onClick={() => navigate("register")}>Register</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  const [slide, setSlide] = useState(0);
  const touchStart = useRef(0);
  const previous = () => setSlide((slide - 1 + spotlights.length) % spotlights.length);
  const next = () => setSlide((slide + 1) % spotlights.length);
  const current = spotlights[slide];
  return (
    <main>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-40 -top-40 size-[38rem] rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-teal-200 backdrop-blur">
              <Sparkles className="size-4" /> Built for every chapter after graduation
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.045em] md:text-7xl">
              Once an InnoSCI Graduate, <span className="text-teal-300">always part of the InnoSCI community.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Reconnect, collaborate, mentor and grow with the InnoSCI alumni community.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button className="px-6 py-3.5" onClick={() => setPage("register")}>Join Alumni Network <ArrowRight className="size-4" /></Button>
              <Button className="border-white/15 bg-white/5 px-6 py-3.5 text-white hover:bg-white/10 hover:text-white" variant="secondary" onClick={() => setPage("directory")}>
                Explore our community
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-7">
              <div className="flex -space-x-2.5">
                {photos.slice(0, 4).map((photo, index) => <Avatar key={photo} src={photo} name={alumni[index].name} className="size-10" />)}
              </div>
              <div>
                <div className="text-sm font-bold text-white">2,400+ alumni</div>
                <div className="mt-0.5 text-xs text-slate-400">Learning, leading and giving back</div>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -left-8 top-16 z-10 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-teal-400 text-navy-950"><UserRoundPlus className="size-5" /></span>
                <span><strong className="block text-sm">New connection</strong><span className="text-xs text-slate-300">Amara connected with Kwame</span></span>
              </div>
            </div>
            <div className="ml-auto w-[86%] rotate-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <img src={photos[5 % photos.length]} alt="InnoSCI alumni working together" className="h-[470px] w-full rounded-[1.4rem] object-cover" />
            </div>
            <div className="absolute -bottom-7 right-0 w-64 -rotate-2 rounded-2xl bg-white p-5 text-slate-950 shadow-2xl">
              <div className="flex items-center justify-between"><Pill>Community pulse</Pill><TrendingUp className="size-5 text-teal-600" /></div>
              <div className="mt-4 text-3xl font-bold">86%</div>
              <div className="mt-1 text-xs leading-5 text-slate-500">of members made a meaningful professional connection this month.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
          {[["2,400+", "Alumni worldwide"], ["38", "Countries represented"], ["520+", "Mentor matches"], ["180+", "Opportunities shared"]].map(([value, label]) => (
            <div key={label}><div className="text-2xl font-extrabold text-slate-950">{value}</div><div className="mt-1 text-xs font-semibold text-slate-400">{label}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Alumni spotlight" title="Stories that move us forward" description="Meet graduates using their InnoSCI foundation to shape industries, build communities and create lasting impact." />
          <div
            className="relative overflow-hidden rounded-[2rem] bg-navy-950 text-white shadow-xl shadow-slate-900/10"
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => { const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 50) distance > 0 ? next() : previous(); }}
          >
            <div key={current.name} className="spotlight-in grid min-h-[480px] lg:grid-cols-[0.84fr_1.16fr]">
              <div className="relative min-h-80 overflow-hidden">
                <img src={current.image} alt={current.name} className="absolute inset-0 size-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/20" />
                <div className="absolute bottom-6 left-6 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold backdrop-blur-lg">Class of {current.year}</div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-300">Spotlight {String(slide + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{current.name}</div>
                <div className="mt-2 font-semibold text-teal-300">{current.role} · {current.company}</div>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">{current.story}</p>
                <blockquote className="mt-7 border-l-2 border-teal-400 pl-5 text-xl font-medium italic leading-8 text-white">“{current.quote}”</blockquote>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                  <Button variant="secondary" className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={() => setPage("directory")}>View profile <ArrowRight className="size-4" /></Button>
                  <div className="flex items-center gap-2">
                    <button onClick={previous} className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:bg-white/10" aria-label="Previous story"><ArrowLeft className="size-4" /></button>
                    <button onClick={next} className="grid size-10 place-items-center rounded-full bg-teal-400 text-navy-950 transition hover:bg-teal-300" aria-label="Next story"><ArrowRight className="size-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {spotlights.map((profile, index) => (
              <button key={profile.name} onClick={() => setSlide(index)} aria-label={`View ${profile.name}`} className={`h-2 rounded-full transition-all ${slide === index ? "w-8 bg-teal-500" : "w-2 bg-slate-300 hover:bg-slate-400"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="One community, many possibilities" title="Your network for what comes next" description="Find the people, guidance and opportunities to move your ambitions forward." />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, title: "Reconnect", text: "Find former classmates and discover graduates across industries and locations.", action: "Explore directory", page: "directory" as Page },
              { icon: HeartHandshake, title: "Grow together", text: "Share experience, find a mentor or help the next generation navigate their path.", action: "Visit mentorship", page: "mentorship" as Page },
              { icon: BriefcaseBusiness, title: "Move forward", text: "Discover alumni-shared roles, graduate programmes and professional events.", action: "Browse opportunities", page: "jobs" as Page },
            ].map(({ icon: Icon, title, text, action, page }) => (
              <button key={title} onClick={() => setPage(page)} className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-900/5">
                <span className="grid size-12 place-items-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-500 group-hover:text-white"><Icon className="size-6" /></span>
                <span className="mt-6 block text-xl font-bold text-slate-950">{title}</span>
                <span className="mt-3 block text-sm leading-6 text-slate-500">{text}</span>
                <span className="mt-6 flex items-center gap-2 text-sm font-bold text-teal-700">{action}<ChevronRight className="size-4 transition group-hover:translate-x-1" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-400 px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 md:flex-row">
          <div><div className="text-3xl font-bold tracking-tight text-navy-950">Your InnoSCI story continues here.</div><p className="mt-2 text-sm font-medium text-teal-950/70">Join a growing community that wants to see you thrive.</p></div>
          <Button className="bg-navy-950 px-6 py-3.5 text-white hover:bg-navy-900" onClick={() => setPage("register")}>Create your alumni profile <ArrowRight className="size-4" /></Button>
        </div>
      </section>
    </main>
  );
}

function RegistrationPage({ setPage }: { setPage: (page: Page) => void }) {
  const [success, setSuccess] = useState(false);
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
        <form onSubmit={(event) => { event.preventDefault(); setSuccess(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600"><CircleUserRound className="size-5" /></span><div><div className="font-bold text-slate-950">Personal information</div><div className="text-xs text-slate-400">Help fellow alumni recognise you.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" placeholder="e.g. Amara Okafor" required />
              <Field label="Email Address" placeholder="you@email.com" type="email" icon={Mail} required />
              <Field label="Contact Number" placeholder="+234 000 000 0000" required />
              <Field label="Location" placeholder="City, Country" icon={MapPin} required />
              <SelectField label="Graduation Year / Cohort" options={["Select your cohort", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]} />
              <SelectField label="Programme Completed" options={["Select programme", "Cloud Computing", "Software Development", "Data Analytics", "Project Management", "Cybersecurity"]} />
            </div>
          </div>
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><BriefcaseBusiness className="size-5" /></span><div><div className="font-bold text-slate-950">Professional profile</div><div className="text-xs text-slate-400">Share what you do and what energises you.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Current Job Title" placeholder="e.g. Cloud Solutions Architect" />
              <Field label="Company" placeholder="Your organisation" icon={Building2} />
              <Field label="LinkedIn Profile URL" placeholder="linkedin.com/in/yourname" icon={Link} />
              <Field label="Skills and Expertise" placeholder="AWS, Leadership, Data..." />
              <Field label="Areas of Interest" placeholder="Mentorship, networking..." />
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Profile Picture</span><span className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm text-slate-500 transition hover:border-teal-400 hover:bg-teal-50/50"><Upload className="size-5 text-teal-600" /> Upload JPG or PNG<input type="file" accept="image/*" className="hidden" /></span></label>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600"><LockKeyhole className="size-5" /></span><div><div className="font-bold text-slate-950">Secure your account</div><div className="text-xs text-slate-400">Use at least 8 characters.</div></div></div>
            <div className="grid gap-5 md:grid-cols-2"><Field label="Password" placeholder="Create password" type="password" required /><Field label="Confirm Password" placeholder="Repeat password" type="password" required /></div>
            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-500"><input type="checkbox" required className="mt-1 size-4 accent-teal-600" /><span>I agree to the community guidelines and consent to my approved profile being visible to verified InnoSCI alumni.</span></label>
            <div className="mt-8 flex justify-end"><Button type="submit" className="w-full px-7 md:w-auto">Submit registration <ArrowRight className="size-4" /></Button></div>
          </div>
        </form>
      </div>
    </main>
  );
}

function AppShell({ page, setPage, admin = false, children }: { page: Page; setPage: (page: Page) => void; admin?: boolean; children: React.ReactNode }) {
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

function DashboardPage({ setPage }: { setPage: (page: Page) => void }) {
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

function PanelHeader({ title, action, onClick }: { title: string; action: string; onClick?: () => void }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-950">{title}</h2><button onClick={onClick} className="text-xs font-bold text-teal-700 hover:text-teal-500">{action}</button></div>;
}

function ConnectionRow({ person }: { person: Alumni }) {
  const [connected, setConnected] = useState(false);
  return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Avatar src={person.image} name={person.name} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-slate-900">{person.name}</div><div className="truncate text-xs text-slate-400">{person.role}</div></div><button onClick={() => setConnected(!connected)} className={`grid size-9 place-items-center rounded-xl ${connected ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-700"}`}>{connected ? <Check className="size-4" /> : <Plus className="size-4" />}</button></div>;
}

function JobRow({ job }: { job: (typeof jobs)[number] }) {
  return <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 md:flex-row md:items-center"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600"><Building2 className="size-5" /></span><div><div className="font-bold text-slate-950">{job.title}</div><div className="mt-1 text-sm text-slate-500">{job.company} · {job.location}</div><div className="mt-2 flex gap-2"><Pill tone="blue">{job.type}</Pill><span className="text-xs text-slate-400">{job.date}</span></div></div></div><Button variant="secondary">View role <ArrowRight className="size-4" /></Button></div>;
}

function DirectoryPage({ setPage }: { setPage: (page: Page) => void }) {
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

function AlumniCard({ person }: { person: Alumni }) {
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

function MentorshipPage({ setPage }: { setPage: (page: Page) => void }) {
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
        {tab === "Become a mentor" && <div className="mx-auto mt-7 max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-50 text-teal-600"><HeartHandshake className="size-8" /></span><h2 className="mt-6 text-2xl font-bold text-slate-950">Your experience can change a career.</h2><p className="mt-3 text-sm leading-6 text-slate-500">Choose the areas you can support, set your availability and we’ll introduce you to alumni ready to learn.</p><div className="mt-6 grid gap-4 text-left sm:grid-cols-2"><SelectField label="Mentorship area" options={["Select expertise", "Cloud Computing", "Software Development", "Data Analytics", "Leadership"]} /><SelectField label="Monthly availability" options={["2 hours", "4 hours", "6 hours", "8+ hours"]} /></div><Button className="mt-6">Create mentor profile <ArrowRight className="size-4" /></Button></div>}
      </div>
    </AppShell>
  );
}

function JobsPage({ setPage }: { setPage: (page: Page) => void }) {
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

function AdminPage({ setPage }: { setPage: (page: Page) => void }) {
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

function Footer() {
  return <footer className="bg-navy-950 px-5 py-12 text-slate-400"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><div><Logo /><p className="mt-4 max-w-sm text-xs leading-5">Connecting InnoSCI graduates to people, ideas and possibilities that last a lifetime.</p></div><div className="flex flex-wrap gap-6 text-xs font-semibold"><span>Community guidelines</span><span>Privacy</span><span>Help centre</span><span>© 2025 InnoSCI</span></div></div></footer>;
}

export default function App() {
  const [page, setPageState] = useState<Page>("home");
  const setPage = (next: Page) => {
    setPageState(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const publicPage = useMemo(() => ["home", "register"].includes(page), [page]);
  return (
    <div className="min-h-screen bg-white">
      {publicPage && <PublicHeader page={page} setPage={setPage} />}
      {page === "home" && <><HomePage setPage={setPage} /><Footer /></>}
      {page === "register" && <RegistrationPage setPage={setPage} />}
      {page === "dashboard" && <DashboardPage setPage={setPage} />}
      {page === "directory" && <DirectoryPage setPage={setPage} />}
      {page === "mentorship" && <MentorshipPage setPage={setPage} />}
      {page === "jobs" && <JobsPage setPage={setPage} />}
      {page === "admin" && <AdminPage setPage={setPage} />}
    </div>
  );
}
