import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    database: "postgres",
  },
});
