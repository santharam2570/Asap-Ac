// Thin client for the future Python (FastAPI / Django) backend.
// Configure the base URL with NEXT_PUBLIC_API_URL, e.g. http://localhost:8000/api

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const isApiConfigured = Boolean(API_URL);

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new ApiError("Backend API is not configured (NEXT_PUBLIC_API_URL).");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? body.message ?? detail;
    } catch {}
    throw new ApiError(String(detail), res.status);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}

export const apiGet = <T>(path: string) => request<T>(path);

export const apiPost = <T>(path: string, body: unknown) =>
  request<T>(path, { method: "POST", body: JSON.stringify(body) });

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  course?: string;
  mode?: string;
  message?: string;
  source: "contact" | "course" | "corporate";
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!isApiConfigured && process.env.NODE_ENV !== "production") {
    console.info("[dev] Enquiry (backend not configured):", payload);
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  await apiPost("/enquiries", payload);
}
