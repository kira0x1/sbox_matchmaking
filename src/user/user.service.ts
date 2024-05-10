import { User } from "../database/types";
import { IUser } from "../types";

export async function findAll(): Promise<User[]> {
   return User.findAll();
}

export async function find(id: number): Promise<User | null> {
   return User.findOne({ where: { id: id } });
}

export async function create(newUser: IUser): Promise<User> {
   return User.create({ ...newUser });
}

export async function update(id: number, userUpdate: IUser): Promise<IUser | null> {
   const user = await find(id);

   if (!user) {
      return null;
   }

   user.update({ ...userUpdate });
   return user;
}

export async function remove(id: number): Promise<null | void> {
   const user = await find(id);

   if (!user) {
      return null;
   }

   return user.destroy();
}
