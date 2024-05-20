import { faker } from "@faker-js/faker";
import db from ".";
import { user, lobby } from "./schema";
import type { ILobby, IUser } from "../types";
import clc from "cli-color";

console.log(clc.bgRed.bold(`\nSEEDING DB\n`));

const randomUser = (lobbyId?: number): IUser => {
  return {
    displayName: faker.internet.userName(),
    steamId: faker.string.numeric(64),
    lobbyId: !lobbyId && lobbyId !== 0 ? Math.round(Math.random()) : lobbyId,
  };
};

const randomLobby = (lobbyId?: number): ILobby => {
  return {
    id: lobbyId,
    lobbyName: faker.company.buzzVerb() + " lobby",
  };
};

const userData = [];
const lobbyData = [];

const owner0 = randomUser(0);
const owner1 = randomUser(1);

const lobby0 = randomLobby(0);
lobby0.ownerId = owner0.steamId;

const lobby1 = randomLobby(1);
lobby1.ownerId = owner1.steamId;

lobbyData.push(lobby0, lobby1);
userData.push(owner0, owner1);

for (let i = 0; i < 10; i++) {
  userData.push(randomUser());
}

for (let i = 0; i < 3; i++) {
  lobbyData.push(randomLobby(i + 2));
}

await db.insert(user).values(userData);
await db.insert(lobby).values(lobbyData);

console.log(clc.bgBlue.bold(`\nDONE SEEDING\n`));

process.exit(0);
