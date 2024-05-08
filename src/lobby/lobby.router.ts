import express, { Request, Response } from "express";
import { Lobbies } from "../types";
import * as LobbyService from "./lobby.service";

export const lobbyRouter = express.Router();

lobbyRouter.get("/", async (req: Request, res: Response) => {
  try {
    const lobbies: Lobbies = await LobbyService.findAll();
    res.status(200).send(lobbies);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
