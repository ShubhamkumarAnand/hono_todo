import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  username: varchar('username', { length: 12 }).unique(),
  password: text('password').notNull(),
  imageUrl: text('image_url'),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  category: varchar('category', { length: 255 }),
  body: text('body'),
  authorId: integer('author_id'),
});

export const todosRelations = relations(todos, ({ one }) => ({
  todo: one(users, {
    fields: [todos.authorId],
    references: [users.id],
  }),
}));
