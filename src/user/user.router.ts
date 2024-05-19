import express, { type Request, type Response } from "express";
import clc from "cli-color";

import * as UserService from "./user.service.js";
import * as utils from "../util/index.js";

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

userRouter.post("/update/:id", async (req: Request, res: Response) => {
   try {
      const id = req.params.id;

      const updatedUser = await UserService.update(id, req.body);

      res.status(200).send(updatedUser);
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
      console.log(result);

      console.log(`Token: ${token}`);
      console.log(`SteamId: ${steamId}`);

      console.log(`\n-------- JSON ---------`);
      console.dir(req.body);
      console.log(`--------------------\n\n`);

      if (!result || result?.Status === "invalid") {
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

userRouter.get("/lobby", async (req: Request, res: Response) => {
   const id = req.query.id as string;
   const userId = req.query.userid as string;

   try {
   } catch (e: any) {}
});

userRouter.get("/:id", async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const userFound = await UserService.find(id);

      if (userFound) {
         res.status(200).send(userFound);
         return;
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
      res.status(200).json(newUser);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});
