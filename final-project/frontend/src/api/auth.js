const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("auth", data.auth);
    localStorage.setItem("uname", data.username2);
    return data;
  } else {
    throw new Error(data.message || "Login failed");
  }
}
export function getRole() {
  return localStorage.getItem("role");
}
export function getToken() {
  return localStorage.getItem("token");
}
export function getAuth() {
  return localStorage.getItem("auth");
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("auth");
  localStorage.removeItem("uname");
}
