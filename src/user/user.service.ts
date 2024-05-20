import { eq } from "drizzle-orm";
import db from "../database";
import { lobby, user } from "../database/schema";
import { type IUser } from "../types";

export async function findAll() {
  const users = await db.select().from(user);
  return users;
}

export async function findBySteamId(id: string) {
  const userFound = await db
    .selectDistinct()
    .from(user)
    .where(eq(user.steamId, id));

  return userFound;
}

export async function find(id: string) {
  const userFound = await db.selectDistinct().from(user).where(eq(user.id, id));
  return userFound;
}

export async function findOwnedLobby(id: string) {
  const userFound = await db.query.lobby.findFirst({
    where: eq(lobby.ownerId, id),
  });
  return userFound;
}

export async function create(newUser: IUser) {
  const createdUser = await db
    .insert(user)
    .values({ ...newUser })
    .returning();

  return createdUser;
}

export async function update(id: string, userValues: IUser) {
  const userUpdated = await db
    .update(user)
    .set({ ...userValues })
    .where(eq(user.steamId, id))
    .returning();

  return userUpdated;
}

export async function findOrCreate(newUser: IUser) {
  const foundUser = await find(newUser.steamId);
  if (foundUser) return foundUser;

  return create(newUser);
}

export async function remove(id: string): Promise<null | void> {}
