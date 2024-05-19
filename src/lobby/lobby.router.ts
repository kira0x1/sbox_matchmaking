import express, { type Request, type Response } from "express";
import * as lobbyService from "./lobby.service";

export const lobbyRouter = express.Router();

lobbyRouter.get("/", async (req: Request, res: Response) => {
   try {
      const lobbies = await lobbyService.findAll();
      res.status(200).send(lobbies);
   } catch (e) {
      res.status(500).send();
   }
});

lobbyRouter.get("/:id", async (req: Request, res: Response) => {
   try {
      const id = Number(req.params.id);
      const lobbyFound = await lobbyService.find(id);
      if (lobbyFound) res.status(200).send(lobbyFound);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

lobbyRouter.get("/owner/:id", async (req: Request, res: Response) => {});

lobbyRouter.post("/", async (req: Request, res: Response) => {
   try {
      console.log(req.body);
      const lobbyToCreate = req.body;
      const lobbyCreated = await lobbyService.create(lobbyToCreate);
      res.status(200).send(lobbyCreated);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

lobbyRouter.post("/delete", async (req: Request, res: Response) => {});
