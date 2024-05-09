export interface User {
    displayName: string;
    steamId: number;
}

export interface Users {
    [key: number]: User;
}

export interface Lobby {
    owner: User;
    lobbyName: string;
    players: Array<User>;
    playerCount: number;
    maxPlayers: number;
}

export interface Lobbies {
    [key: number]: Lobby;
}
