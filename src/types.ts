export interface IUser {
  displayName: string;
  steamId: string;
  lobbyId?: number;
}

export interface BaseLobby {
  ownerId: string;
  lobbyName: string;
  maxPlayers: number;
}

export interface SteamVerifyResponse {
  SteamId: string;
  Status: string;
  Failed?: boolean;
}
