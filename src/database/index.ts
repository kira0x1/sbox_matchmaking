import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import clc from "cli-color";
import { Client } from "pg";

class DbConnection {
  static client = new Client({
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    database: "postgres",
  });

  public static db = drizzle(this.client, { schema });

  constructor() {
    this.connect();
  }

  public async connect() {
    DbConnection.client.connect();
    console.log(clc.bgMagenta.bold("DB CONNECTED"));
  }
}

new DbConnection();

export default DbConnection.db;
