import { Hono } from 'hono';
import { createUser, getAllUsers, getOneUser, removeUser, updateUser } from './handlers/users';
import { userType, userUpdateType } from '../type';
import { logger } from 'hono/logger';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => c.text('Welcome to HONO!'));

app.get('/user', async (c) => {
  const users = await getAllUsers();
  return c.json({ users });
});

app.get('/user/:id', async (c) => {
  const id = c.req.param('id');
  const user = await getOneUser(id);
  return c.json({ user });
});

app.post('/user', async (c) => {
  const post = await c.req.json<userType>();
  const user = await createUser(post);
  return c.json({ user });
});

app.patch('/user/:id', async (c) => {
  const post = await c.req.json<userUpdateType>();
  const id = c.req.param('id');
  const updatedUser = await updateUser(post, id);
  return c.json({ user: updatedUser });
});

app.delete('/user/:id', async (c) => {
  const id = c.req.param('id');
  const user = await removeUser(id);
  return c.json({ user });
});

export default app;
