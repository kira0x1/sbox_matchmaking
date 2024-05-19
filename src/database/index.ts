import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import clc from "cli-color";
import { Client } from "pg";

const client = new Client({
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  database: "postgres",
});

export const db = drizzle(client, { schema });

export async function init() {
  await client.connect();

  // const users = await db.select().from(user);
  // const lobbies = await db.select().from(lobby);

  // console.log("");
  // console.log(users);
  // console.log(`\n\n---- Lobbies ----\n`);
  // console.log(lobbies);
  // console.log("");

  // const lb = await db.query.user.findMany({ with: { lobby: true } });

  // console.log(`\n\n---- Found Lobbies ----\n`);
  // console.log(lb);
  // console.log("");

  console.log(clc.bgMagenta.bold("INIT DB"));
}
