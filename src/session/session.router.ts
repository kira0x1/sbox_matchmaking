import * as userApi from "../user/index.js";
import * as utils from "../util/index.js";
import express, { type Request, type Response } from "express";

export const sessionRouter = express.Router();

sessionRouter.post("/", (req, res) => {
   createSessionHandler(req, res);
});

async function createSessionHandler(req: Request, res: Response) {
   const token = req.headers["token"] as string;

   const { steamId, displayName } = req.body;

   const user = await userApi.findOrCreate({ displayName, steamId });
   const steamVerify = await utils.verifySteamToken(token, steamId);

   if (steamVerify.Failed) {
      return res.status(500).send("Steam Failed to verify id");
   }

   return res.status(200).send("session handler :o");
}
