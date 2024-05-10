import express, { Request, Response } from "express";
import { BaseLobby } from "../types";
import * as LobbyService from "./lobby.service";

export const lobbyRouter = express.Router();

lobbyRouter.get("/", async (req: Request, res: Response) => {
   try {
      const lobbies = await LobbyService.findAll();
      res.status(200).send(lobbies);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

lobbyRouter.get("/:id", async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id, 10);

   try {
      const lobby = await LobbyService.find(id);

      if (lobby) {
         return res.status(200).send(lobby);
      }

      res.status(404).send("lobby not found");
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

lobbyRouter.get("/owner/:id", async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id, 10);
   console.log(`searching for specific by user!: ${id}`);

   try {
      const lobby = await LobbyService.findByUser(id);

      if (lobby) {
         return res.status(200).send(lobby);
      }

      res.status(404).send("lobby not found");
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

lobbyRouter.post("/", async (req: Request, res: Response) => {
   try {
      console.log("creating lobby");

      const lobby: BaseLobby = req.body;
      console.log(lobby);

      const newLobby = await LobbyService.create(lobby);

      res.status(201).json(newLobby);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});
