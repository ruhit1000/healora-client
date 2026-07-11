import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
};

export const serverMutation = async <T = unknown>(
  path: string, 
  method: "POST" | "PUT" | "PATCH", 
  data: unknown
): Promise<T> => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const serverDelete = async <T = unknown>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  return res.json();
};

export const serverFetch = async <T = unknown>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    cache: "no-store",
  });
  return res.json();
};

export const protectedFetch = async <T = unknown>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}/api/${path}`, {
    cache: "no-store",
    headers: await authHeader(),
  });
  return res.json();
};