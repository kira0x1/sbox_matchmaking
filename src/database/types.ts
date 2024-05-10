import { DataTypes, Model } from "sequelize";
import { conn } from ".";

export class User extends Model {
   declare id: number;
   declare steamId: number;
   declare displayName: string;
}

export class Lobby extends Model {}

export function InitUser() {
   User.init(
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         displayName: DataTypes.STRING,
         steamId: {
            type: DataTypes.NUMBER,
            unique: true,
            allowNull: false,
         },
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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: User,
               key: "steamId",
            },
         },
         lobbyName: DataTypes.STRING,
         maxPlayers: DataTypes.NUMBER,
      },
      {
         sequelize: conn,
      }
   );
}
