import { faker } from "@faker-js/faker";
import db from ".";
import { user } from "./schema";
import type { IUser } from "../types";
import clc from "cli-color";

console.log(clc.bgRed.bold(`\nSEEDING DB\n`));

const randomUser = (lobbyId?: number): IUser => {
  return {
    displayName: faker.internet.userName(),
    steamId: faker.string.numeric(64),
    lobbyId: !lobbyId ? Math.round(Math.random()) : lobbyId,
  };
};

const data = [];

for (let i = 0; i < 10; i++) {
  data.push(randomUser());
}

await db.insert(user).values(data);

console.log(clc.bgBlue.bold(`\nDONE SEEDING\n`));

process.exit(0);
