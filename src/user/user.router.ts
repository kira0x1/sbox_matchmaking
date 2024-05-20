import * as UserService from "./user.service.js";
import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", async (c) => {
  try {
    const users = await UserService.findAll();

    return c.json({ users }, 200);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

userRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const newUser = await UserService.create(body);

    return c.json(newUser, 200);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

userRouter.post("/update/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const updatedUser = await UserService.update(id, body);

    return c.json(updatedUser, 200);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

userRouter.post("/auth", async (c) => {});

userRouter.get("/lobby", async (c) => {
  const id = c.req.query("id");
  const userId = c.req.query("userid");

  try {
  } catch (e: any) {}
});

userRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userFound = await UserService.find(id);

    if (userFound) {
      return c.json(userFound, 200);
    }

    return c.json({ error: "user not found" }, 404);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

userRouter.post("/findOrCreate", async (c) => {
  try {
    const body = await c.req.json();
    const newUser = await UserService.findOrCreate(body);
    return c.json(newUser, 200);
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

export default userRouter;
