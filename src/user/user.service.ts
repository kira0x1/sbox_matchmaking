import { User, Users } from "../types";

let users: Users = {
  1: { displayName: "kira", steamId: 1 },
  2: { displayName: "test", steamId: 2 },
};

export async function findAll(): Promise<User[]> {
  return Object.values(users);
}

export async function find(id: number): Promise<User> {
  return users[id];
}

export async function create(newUser: User): Promise<User> {
  const id = new Date().valueOf();

  users[id] = {
    ...newUser,
  };

  return users[id];
}

export async function update(
  id: number,
  userUpdate: User
): Promise<User | null> {
  const user = await find(id);

  if (!user) {
    return null;
  }

  users[id] = { ...userUpdate };

  return users[id];
}

export async function remove(id: number): Promise<null | void> {
  const user = await find(id);

  if (!user) {
    return null;
  }

  delete users[id];
}
