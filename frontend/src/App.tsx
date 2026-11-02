import { useMemo, useState } from "react";

export type Page =
  | "home"
  | "register"
  | "dashboard"
  | "directory"
  | "mentorship"
  | "jobs"
  | "admin";

export type Alumni = {
  name: string;
  year: string;
  role: string;
  company: string;
  location: string;
  skills: string[];
  image: string;
  program: string;
};

import RegistrationPage from "./Registration";
import { Logo} from "./Picture";
import { DashboardPage } from "./DashBoardPage";
import { AdminPage } from "./AdminPage";
import { MentorshipPage } from "./MentorshipPage";
import { HomePage } from "./HomePage";
import { PublicHeader } from "./PublicHeader";
import { DirectoryPage } from "./DirectoryPage";
import { JobsPage } from "./JobPage";

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
