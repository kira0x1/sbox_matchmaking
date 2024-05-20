import { eq } from "drizzle-orm";
import db from "../database";
import { lobby } from "../database/schema";
import { type ILobby } from "../types";

export async function findAll() {
  const lobbies = await db.select().from(lobby);
  return lobbies;
}

export async function find(id: number) {
  const lobbyFound = await db.query.lobby.findFirst({
    where: eq(lobby.id, id),
  });
  console.log(lobbyFound);
  return lobbyFound;
}

export async function getMembers(id: number) {
  const lobbyFound = await db.query.lobby.findFirst({
    where: eq(lobby.id, id),
    with: { members: true },
  });

  console.log(lobbyFound);
  return lobbyFound;
}

export async function findByOwner(id: string) {
  const lobbyFound = await db.select().from(lobby).where(eq(lobby.ownerId, id));
  console.log(lobbyFound);
  return lobbyFound;
}

export async function create(newLobby: ILobby) {
  const createdLobby = await db
    .insert(lobby)
    .values({ ownerId: newLobby.ownerId })
    .returning();

  return createdLobby;
}

export async function update(id: number, lobbyUpdate: ILobby) {}

export async function remove(id: number) {
  const res = await db.delete(lobby).where(eq(lobby.id, id));
  return res;
}
