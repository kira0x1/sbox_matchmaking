import { Hono } from "hono";
import config from "./config";
import sessionRouter from "./session/session.router";
import userRouter from "./user/user.router";
import lobbyRouter from "./lobby/lobby.router";
import * as db from "./database/index";

db.init();

const app = new Hono();

app.route("/session", sessionRouter);
app.route("/users", userRouter);
app.route("/lobby", lobbyRouter);

export default app;
