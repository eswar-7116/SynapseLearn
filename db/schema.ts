import { pgTable, serial, varchar, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

export const example = pgTable('example', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  title: text('title').notNull(),
  topic: text('topic').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}); 