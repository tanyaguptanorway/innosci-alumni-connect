
import { useState } from "react";
import {
  Sparkles,
  X,
  Minus,
  Send,
  BookOpen,
  GraduationCap,
  Target,
  Users,
  Route,
  Loader2,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { apiFetch } from "./api";

type Guidance = {
  summary: string;
  skills_to_learn: { name: string; why: string; priority: string }[];
  courses: { title: string; provider: string; why: string }[];
  roadmap: {
    step: number;
    title: string;
    duration: string;
    actions: string[];
  }[];
  mentors: {
    name: string;
    role: string;
    company: string;
    reason: string;
  }[];
};

const levels = ["student", "entry", "junior", "mid", "senior"];

const split = (v?: string | null) =>
  (v ?? "").split(/[,;]/).map((s) => s.trim()).filter(Boolean);

export function CareerAssistant() {
  const { me } = useAuth();

  const [role, setRole] = useState("");
  const [level, setLevel] = useState("entry");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Guidance | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  async function submit() {
    setError("");

    if (role.trim().length < 2) {
      setError("Enter the job role you are aiming for.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await apiFetch("/api/career/recommend", {
        method: "POST",
        body: JSON.stringify({
          education:
            [
              me?.program,
              me?.graduation_year
                ? `class of ${me.graduation_year}`
                : "",
            ]
              .filter(Boolean)
              .join(", ") || "InnoSCI alumni",

          skills: split(me?.skills).slice(0, 30),
          interests: split(me?.interests).slice(0, 20),
          experience_level: level,
          target_role: role.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        setError(
          typeof data.detail === "string"
            ? data.detail
            : "Could not get guidance. Please try again."
        );

        return;
      }

      setResult(await res.json());
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FLOATING AI BUTTON */}

      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setMinimized(false);
          }}
          className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-teal-600 px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:bg-teal-700 hover:scale-105"
          aria-label="Open AI Career Assistant"
        >
          <Sparkles className="size-6 shrink-0" />

          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-48">
            AI Career Assistant
          </span>
        </button>
      )}

      {/* FLOATING ASSISTANT WINDOW */}

      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 sm:w-[440px] ${
            minimized ? "h-[64px]" : "h-[min(720px,85vh)]"
          }`}
        >
          {/* HEADER */}

          <div className="flex shrink-0 items-center justify-between bg-navy-950 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-teal-500">
                <Sparkles className="size-5" />
              </div>

              <div>
                <h2 className="text-sm font-bold">
                  AI Career Assistant
                </h2>
                <p className="text-xs text-slate-300">
                  Your personal career guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Minimize assistant"
              >
                <Minus className="size-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* CONTENT */}

              <div className="flex-1 space-y-5 overflow-y-auto p-5">

                {!result && (
                  <div>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                      <Sparkles className="size-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      Let's plan your career!
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Tell me the job role you want to pursue.
                      I'll analyse your profile and recommend
                      skills, courses, career steps and alumni
                      mentors who can help.
                    </p>
                  </div>
                )}

                {/* INPUTS */}

                <div className="space-y-3">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      What role are you aiming for?
                    </label>

                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="e.g. Cloud Solutions Architect"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Your experience level
                    </label>

                    <select
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-500"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      {levels.map((l) => (
                        <option key={l} value={l}>
                          {l.charAt(0).toUpperCase() + l.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={submit}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Analysing your profile...
                      </>
                    ) : (
                      <>
                        Get career guidance
                        <Send className="size-4" />
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                {/* LOADING */}

                {loading && (
                  <div className="rounded-xl bg-teal-50 p-4 text-center">
                    <Sparkles className="mx-auto size-7 animate-pulse text-teal-600" />
                    <p className="mt-2 text-sm font-semibold text-teal-800">
                      Building your career roadmap
                    </p>
                    <p className="mt-1 text-xs text-teal-700">
                      Analysing your skills and experience...
                    </p>
                  </div>
                )}

                {/* GUIDANCE RESULTS */}

                {result && (
                  <div className="space-y-5">

                    <section className="rounded-xl bg-teal-50 p-4">
                      <div className="mb-2 flex items-center gap-2 font-bold text-teal-900">
                        <Target className="size-5" />
                        Your career direction
                      </div>

                      <p className="text-sm leading-6 text-slate-700">
                        {result.summary}
                      </p>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 font-bold text-slate-900">
                        <GraduationCap className="size-5 text-teal-600" />
                        Skills to learn
                      </h3>

                      <div className="mt-3 space-y-2">
                        {result.skills_to_learn.map((s) => (
                          <div
                            key={s.name}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                          >
                            <div className="flex flex-wrap justify-between gap-2">
                              <span className="font-semibold text-slate-900">
                                {s.name}
                              </span>

                              <span className="text-[10px] font-bold uppercase text-teal-700">
                                {s.priority}
                              </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {s.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 font-bold text-slate-900">
                        <BookOpen className="size-5 text-teal-600" />
                        Recommended courses
                      </h3>

                      <div className="mt-3 space-y-2">
                        {result.courses.map((c) => (
                          <div
                            key={c.title}
                            className="rounded-xl border border-slate-100 p-3"
                          >
                            <p className="font-semibold text-slate-900">
                              {c.title}
                            </p>

                            <p className="text-xs text-teal-700">
                              {c.provider}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {c.why}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 font-bold text-slate-900">
                        <Route className="size-5 text-teal-600" />
                        Your career roadmap
                      </h3>

                      <div className="mt-3 space-y-3">
                        {result.roadmap.map((r) => (
                          <div
                            key={r.step}
                            className="rounded-xl border border-slate-100 p-3"
                          >
                            <div className="font-semibold text-slate-900">
                              Step {r.step}: {r.title}
                            </div>

                            <p className="mt-1 text-xs font-semibold text-teal-700">
                              {r.duration}
                            </p>

                            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-500">
                              {r.actions.map((a) => (
                                <li key={a}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    {result.mentors.length > 0 && (
                      <section>
                        <h3 className="flex items-center gap-2 font-bold text-slate-900">
                          <Users className="size-5 text-teal-600" />
                          Alumni mentors
                        </h3>

                        <div className="mt-3 space-y-2">
                          {result.mentors.map((m) => (
                            <div
                              key={m.name}
                              className="rounded-xl bg-teal-50 p-3"
                            >
                              <p className="font-semibold text-slate-900">
                                {m.name}
                              </p>

                              <p className="text-xs text-teal-700">
                                {[m.role, m.company]
                                  .filter(Boolean)
                                  .join(" at ")}
                              </p>

                              <p className="mt-1 text-xs text-slate-600">
                                {m.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    <button
                      onClick={() => {
                        setResult(null);
                        setError("");
                      }}
                      className="w-full rounded-xl border border-teal-200 py-3 text-sm font-bold text-teal-700 hover:bg-teal-50"
                    >
                      Explore another career
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      
    </>
  );
}
