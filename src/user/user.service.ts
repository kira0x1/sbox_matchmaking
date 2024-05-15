import { User } from "../database/types";
import { IUser } from "../types";

export async function findAll(): Promise<User[]> {
   return User.findAll();
}

export async function find(id: string): Promise<User | null> {
   const userFound = await User.findOne({ where: { steamId: id } });
   return userFound;
}

export async function create(newUser: IUser): Promise<User> {
   const created = await User.create({ ...newUser });
   return created;
}

export async function update(id: string, userUpdate: IUser): Promise<User | null> {
   const user = await find(id);

   if (!user) {
      return null;
   }

   user.update({ ...userUpdate });
   return user;
}

export async function findOrCreate(newUser: IUser) {
   console.log(`finding: `);
   console.log(newUser.steamId);
   console.log(`\n\n`);

   const found = await find(newUser.steamId);
   console.log(`found: `);
   console.dir(found);
   console.log(`\n\n`);

   const userFound = await User.findOrCreate({
      where: { steamId: newUser.steamId },
      defaults: { ...newUser },
   });

   console.log(userFound);

   if (userFound[1]) {
      return userFound[0];
   }

   return userFound[0];
}

export async function remove(id: string): Promise<null | void> {
   const user = await find(id);

   if (!user) {
      return null;
   }

   return user.destroy();
}
