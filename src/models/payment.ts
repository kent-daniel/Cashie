import {
  pgTable,
  serial,
  varchar,
  decimal,
  date,
  text,
} from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(), // Auto-incrementing ID
  projectCode: varchar("project_code", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 10 }).notNull(), // 'debit' or 'credit'
  date: date("date").notNull(),
  email: varchar("email", { length: 100 }).notNull(),
});
