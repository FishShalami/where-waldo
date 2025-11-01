export const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function api(path, options = {}) {
  const url = `${API}${path}`;
  return fetch(url, { credentials: "include", ...options });
}

