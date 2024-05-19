import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  steamId: text("steam_id").unique(),
  displayName: text("display_name").unique(),
  lobbyId: integer("lobby_id"),
});

export const lobby = pgTable("lobby", {
  id: serial("id").primaryKey(),
  ownerId: text("owner_id"),
  lobbyName: text("lobby_name"),
});

export const userRelations = relations(user, ({ one }) => ({
  lobby: one(lobby, {
    fields: [user.lobbyId],
    references: [lobby.id],
  }),
}));

export const lobbyRelations = relations(lobby, ({ one, many }) => ({
  owner: one(user, {
    fields: [lobby.ownerId],
    references: [user.steamId],
  }),
  members: many(user),
}));
