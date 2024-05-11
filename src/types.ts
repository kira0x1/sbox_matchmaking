export interface IUser {
   displayName: string;
   steamId: string;
}

export interface BaseLobby {
   ownerId: string;
   lobbyName: string;
   maxPlayers: number;
}
