import { DataTypes, Model } from "sequelize";
import { conn } from ".";

export class User extends Model {
   declare steamId: string;
   declare displayName: string;
}

export class Lobby extends Model {}

export function InitUser() {
   User.init(
      {
         steamId: {
            primaryKey: true,
            type: DataTypes.BIGINT,
            unique: true,
            allowNull: false,
         },
         displayName: DataTypes.STRING,
      },
      {
         sequelize: conn,
      }
   );
}

export function InitLobby() {
   Lobby.init(
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         ownerId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
               model: User,
               key: "steamId",
            },
         },
         lobbyName: DataTypes.STRING,
         players: DataTypes.NUMBER,
         maxPlayers: DataTypes.NUMBER,
      },
      {
         sequelize: conn,
      }
   );
}
