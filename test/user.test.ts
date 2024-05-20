import { test, expect, mock, spyOn } from "bun:test";
import * as userService from "../src/user/user.service";
import type { IUser } from "../src/types";

mock.module("../src/user/user.service", () => {
  return {
    create: () => {},
  };
});

const createUser = mock(async (data: IUser) => userService.create(data));

test("user create", async () => {
  const data: IUser = {
    steamId: "123541",
    displayName: "huh",
    lobbyId: 1,
  };

  const userCreated = await createUser(data);
  console.log(userCreated);
  //   const getUser = await userService.findAll();

  //   console.log(userCreated);
  //   console.log(getUser);
}, 500);
