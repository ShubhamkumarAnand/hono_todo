import { userType, userUpdateType } from '../../type';
import db from '../config/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getOneUser(id: string) {
  const allUsers = await getAllUsers();
  const user = allUsers.find((user) => user.id === +id);
  if (!user) return `User not found`;
  return user;
}

export async function createUser(body: userType) {
  const hashPassword = await Bun.password.hash(body.password);
  const createUser = await db
    .insert(users)
    .values({
      email: body.email,
      username: body.username,
      firstName: body.first_name,
      lastName: body.last_name,
      password: hashPassword,
      imageUrl: body.image_url,
    })
    .returning({ email: users.email });

  return `User has been created`;
}

export async function updateUser(body: userUpdateType, id: string) {
  const allUser = await getAllUsers();
  const user = allUser.find((user) => user.id === +id);
  if (!user) return `User does not exits`;
  if (body.password) {
    const hashPassword = await Bun.password.hash(body.password);
    const userUpdated = await db
      .update(users)
      .set({
        firstName: body.first_name,
        lastName: body.last_name,
        password: hashPassword,
        imageUrl: body.image_url,
      })
      .where(eq(users.id, user.id))
      .returning();
    return userUpdated;
  }
  const userUpdated = await db
    .update(users)
    .set({ firstName: body.first_name, lastName: body.last_name, imageUrl: body.image_url })
    .where(eq(users.id, user.id))
    .returning();
  return userUpdated;
}

export async function removeUser(id: string) {
  const allUsers = await getAllUsers();
  const user = allUsers.find((user) => user.id === +id);
  if (!user) {
    return `user does not exits`;
  }
  return await db.delete(users).where(eq(users.id, user.id)).returning();
}
