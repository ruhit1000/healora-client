import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  image?: string;
}

export const getUserSession = async (): Promise<AuthUser | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (session?.user as AuthUser) || null;
};

export const getUserToken = async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const requireRole = async (role: "patient" | "doctor" | "admin"): Promise<AuthUser> => {
  const user = await getUserSession();
  
  if (!user) {
    redirect("/login");
  }
  
  if (user.role !== role) {
    redirect("/not-found");
  }
  
  return user;
};