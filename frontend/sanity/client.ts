import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "y9cpmpmf",
    dataset: "production",
    apiVersion: "2026-05-15",
    useCdn: false,
});