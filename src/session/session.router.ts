import { Hono } from "hono";
import * as userApi from "../user/index.js";
import * as utils from "../util/index.js";

const sessionRouter = new Hono();

sessionRouter.post("/", async (c) => {
  const token = c.req.header("token") as string;

  const { displayName, steamId } = await c.req.json();

  const user = await userApi.findOrCreate({
    displayName,
    steamId,
  });

  const steamVerify = await utils.verifySteamToken(token, steamId);

  if (steamVerify.Failed) {
    return c.json({ error: "Steam Failed to verify id" }, 500);
  }

  return c.text("session handler :o", 200);
});

export default sessionRouter;
