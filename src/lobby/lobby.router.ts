import { Hono } from "hono";
import * as lobbyService from "./lobby.service";
import clc from "cli-color";

const lobbyRouter = new Hono();

lobbyRouter.get("/", async (c) => {
  try {
    const lobbies = await lobbyService.findAll();
    return c.json({ lobbies }, 200);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

lobbyRouter.get("/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    console.log(id);
    const lobbyFound = await lobbyService.find(id);

    if (lobbyFound) {
      return c.json({ lobbyFound }, 200);
    }
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
});

lobbyRouter.get("/owner/:id", async (c) => {
  try {
    const id = c.req.param("id") as string;
    console.log(id);
    const lobbyFound = await lobbyService.findByOwner(id);

    if (lobbyFound) {
      return c.json({ lobbyFound }, 200);
    }
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
});

lobbyRouter.get("/:id/members", async (c) => {
  try {
    console.log(clc.bgBlue.bold("LOBBY MEMBERS"));
    const id = Number(c.req.param("id"));
    const lobbyFound = await lobbyService.getMembers(id);

    if (lobbyFound) {
      return c.json({ lobbyFound }, 200);
    }
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
});

lobbyRouter.post("/", async (c) => {
  try {
    const lobbyToCreate = await c.req.json();
    console.log(lobbyToCreate);

    const lobbyCreated = await lobbyService.create(lobbyToCreate);
    return c.json({ lobbyCreated }, 200);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

lobbyRouter.post("/delete", async (c) => {});

export default lobbyRouter;
