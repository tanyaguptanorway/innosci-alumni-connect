import { apiFetch } from "../../api";

export interface CareerRequest {
  education: string;
  skills: string[];
  interests: string[];
  experience_level: "student" | "entry" | "junior" | "mid" | "senior";
  target_role: string;
}

export interface CareerResponse {
  summary: string;

  skills_to_learn: {
    name: string;
    why: string;
    priority: "high" | "medium" | "low";
  }[];

  courses: {
    title: string;
    provider: string;
    why: string;
  }[];

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
}

export async function getCareerGuidance(
  body: CareerRequest
): Promise<CareerResponse> {

  const res = await apiFetch("/api/career/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);

    throw new Error(
      typeof err?.detail === "string"
        ? err.detail
        : "Request failed. Please try again."
    );
  }

  return res.json();
}