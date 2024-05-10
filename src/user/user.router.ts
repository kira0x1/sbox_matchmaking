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
      const user = req.body;
      const newUser = await UserService.create(user);

      res.status(201).json(newUser);
   } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
   }
});
