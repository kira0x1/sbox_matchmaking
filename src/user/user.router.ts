import express, { Request, Response } from "express";
import * as UserService from "./user.service";

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
