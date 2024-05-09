import { Lobbies, Lobby } from "../types";

let lobbies: Lobbies = {};

export async function findAll(): Promise<Lobby[]> {
    return Object.values(lobbies);
}

export async function find(id: number): Promise<Lobby> {
    return lobbies[id];
}

export async function findByUser(id: number): Promise<Lobby | undefined> {
    const lobbies = await findAll();
    const lobbyFound = lobbies.find((l) => l.owner.steamId === id);
    return lobbyFound;
}

export async function create(newLobby: Lobby): Promise<Lobby> {
    const id = new Date().valueOf();

    lobbies[id] = {
        ...newLobby,
    };

    return lobbies[id];
}

export async function update(id: number, lobbyUpdate: Lobby): Promise<Lobby | null> {
    const lobby = await find(id);

    if (!lobby) {
        return null;
    }

    lobbies[id] = { ...lobbyUpdate };

    return lobbies[id];
}

export async function remove(id: number): Promise<null | void> {
    const lobby = await find(id);

    if (!lobby) {
        return null;
    }

    delete lobbies[id];
}
