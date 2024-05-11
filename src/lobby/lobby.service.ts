import { Lobby } from "../database/types";
import { BaseLobby } from "../types";

export async function findAll(): Promise<Lobby[]> {
   const lobbies = Lobby.findAll();
   return lobbies;
}

export async function find(id: number): Promise<Lobby | null> {
   const lobby = Lobby.findOne({ where: { id: id } });
   return lobby;
}

export async function findByUser(id: string): Promise<Lobby | null> {
   const lobby = Lobby.findOne({ where: { ownerId: id } });
   return lobby;
}

export async function create(newLobby: BaseLobby): Promise<Lobby> {
   const createdLobby = Lobby.create({ ...newLobby });
   return createdLobby;
}

export async function update(id: number, lobbyUpdate: BaseLobby): Promise<Lobby | null> {
   const lobby = await find(id);

   if (!lobby) {
      return null;
   }

   lobby.update({ ...lobbyUpdate });
   return lobby;
}

export async function remove(id: number): Promise<null | void> {
   const lobby = await find(id);

   if (!lobby) {
      return null;
   }

   return lobby.destroy();
}
