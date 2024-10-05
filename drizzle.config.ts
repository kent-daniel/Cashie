import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/models/*", // Path to your model files
  out: "./src/migrations", // Output directory for migrations
  dialect: "postgresql",
  dbCredentials: { url: process.env.SUPABASE_CONNECTION_URL! },
  verbose: true,
});
