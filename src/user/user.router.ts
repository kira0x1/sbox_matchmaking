import * as utils from "../util";
import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import ky from "ky";
import clc from "cli-color";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
   try {
      const users = await UserService.findAll();

      res.status(200).send(users);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

userRouter.post("/", async (req: Request, res: Response) => {
   try {
      const newUser = await UserService.create(req.body);

      res.status(201).json(newUser);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

userRouter.post("/auth", async (req: Request, res: Response) => {
   try {
      const token = req.headers["token"] as string;
      const steamId = req.headers["steamid"] as string;

      console.log(`\n------- SIGNING ----------`);
      const jwtSign = utils.signJwt({ steamid: steamId }, "10s");
      console.log(jwtSign);
      console.log(`------------------------\n\n`);

      const result = await utils.verifySteamToken(token, steamId);
      const parsedSteamRes = await result?.json<any>();

      console.log(`Token: ${token}`);
      console.log(`SteamId: ${steamId}`);

      console.log(`\n-------- JSON ---------`);
      console.dir(req.body);
      console.log(`--------------------\n\n`);

      if (!parsedSteamRes || parsedSteamRes?.Status === "invalid") {
         return res.status(500).send("Failed to Authenticate");
      }

      console.log(clc.bgGreen.bold("SUCCESS"));

      res.setHeader("meow", "owo");

      return res.status(200).send("Authorized");
   } catch (e: any) {
      console.error(e.message);
      res.status(500).send(e.message);
   }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
   const id = req.params.id;

   try {
      const user = await UserService.find(id);

      if (user) {
         return res.status(200).send(user);
      }

      res.status(404).send("user not found");
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});

userRouter.post("/findOrCreate", async (req: Request, res: Response) => {
   try {
      const user = req.body;
      const newUser = await UserService.findOrCreate(user);

      res.status(201).json(newUser);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});
