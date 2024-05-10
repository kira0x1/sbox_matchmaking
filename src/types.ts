export interface IUser {
   displayName: string;
   steamId: number;
}

export interface BaseLobby {
   ownerId: number;
   lobbyName: string;
   maxPlayers: number;
}
