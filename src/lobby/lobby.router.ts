import express, { Request, Response } from "express";
import { Lobbies, Lobby } from "../types";
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

lobbyRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    console.log(`searching for specific lobby: ${id}`);

    try {
        const lobby: Lobby = await LobbyService.find(id);

        if (lobby) {
            return res.status(200).send(lobby);
        }

        res.status(404).send("lobby not found");
    } catch (e: any) {
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
        res.status(500).send(e.message);
    }
});

lobbyRouter.post("/", async (req: Request, res: Response) => {
    try {
        console.log("creating lobby");

        const lobby: Lobby = req.body;
        console.log(lobby);

        const newLobby = await LobbyService.create(lobby);

        res.status(201).json(newLobby);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
