"use server";

import { api } from "@/convex/_generated/api";
import { fetchAuthQuery } from "../auth-server";

export const getCurrentUserAction = async () => {
  try {
    // This calls the Convex 'getCurrentUser' query using the Better Auth token
    const user = await fetchAuthQuery(api.auth.getCurrentUser);
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
