import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Welcome to HONO!'));

export default app;
