import { constants } from "@clerk/backend/internal";

export const API_VERSION = Deno.env.get("CLERK_API_VERSION") || "v1";
export const SECRET_KEY = Deno.env.get("CLERK_SECRET_KEY") || "";
export const PUBLISHABLE_KEY = Deno.env.get("CLERK_PUBLISHABLE_KEY") || "";
export const API_URL = Deno.env.get("CLERK_API_URL");
export const JWT_KEY = Deno.env.get("CLERK_JWT_KEY") || "";

export const { Cookies, Headers } = constants;
