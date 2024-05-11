import { Sequelize } from "sequelize";
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

   // User.sync({ force: true });
   // Lobby.sync({ force: true });

   console.log(clc.bgMagenta.bold("INIT DB"));
}
