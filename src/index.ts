import clc from "cli-color";
import express from "express";

import { userRouter } from "./user/user.router";
import { lobbyRouter } from "./lobby/lobby.router";
import { sessionRouter } from "./session/session.router";
import * as db from "./database/index";
import config from "./config";

db.init();

const port = config.port;
const app = express();

app.use(express.json());

app.use("/session/", sessionRouter);
app.use("/users/", userRouter);
app.use("/lobby/", lobbyRouter);

app.listen(port, () => {
   console.log(clc.bgBlue.bold("localhost:" + port));
});
