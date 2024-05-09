import * as dotenv from "dotenv";
import clc from "cli-color";
import express from "express";
import { userRouter } from "./user/user.router";
import { lobbyRouter } from "./lobby/lobby.router";

dotenv.config();

const port = parseInt(process.env.PORT as string) || 3000;
const app = express();

app.use(express.json());
app.use("/users/", userRouter);
app.use("/lobby/", lobbyRouter);

app.listen(port, () => {
    console.log(clc.bgBlue.bold("localhost:" + port));
});
