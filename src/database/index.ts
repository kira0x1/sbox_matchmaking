import { DataTypes, Sequelize } from "sequelize";
import clc from "cli-color";
import { InitLobby, InitUser, Lobby, User } from "./types";

export const conn = new Sequelize({
   dialect: "sqlite",
   storage: "db.sqlite",
   logging: false,
});

export function init() {
   InitUser();
   InitLobby();

   console.log(clc.bgMagenta.bold("INIT DB"));
}
