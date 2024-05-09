import express, { Request, Response } from "express";
import { Users } from "../types";
import * as UserService from "./user.service";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: Users = await UserService.findAll();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
