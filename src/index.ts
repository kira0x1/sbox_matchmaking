import express from "express";
import { userRouter } from "./user/user.router";
import { lobbyRouter } from "./lobby/lobby.router";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("meow");
});

app.use("/users/", userRouter);
app.use("/lobby/", lobbyRouter);

app.listen(port, () => {
  console.log(`Running on: localhost://${port}`);
});
