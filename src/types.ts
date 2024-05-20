export interface IUser {
  displayName: string;
  steamId: string;
  lobbyId?: number;
}

export interface ILobby {
  id?: number;
  ownerId?: string;
  lobbyName: string;
}

export interface SteamVerifyResponse {
  SteamId: string;
  Status: string;
  Failed?: boolean;
}
