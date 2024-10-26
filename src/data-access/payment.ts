import {
  pgTable,
  serial,
  varchar,
  decimal,
  date,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define the `companies` table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// Define the `projects` table with foreign key to `companies`
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .references(() => companies.id, {
      onDelete: "cascade",
    })
    .notNull(),
  projectCode: varchar("project_code", { length: 50 }).notNull().unique(),
  name: text("name"),
  estimationBudget: decimal("estimation_budget", {
    precision: 15,
    scale: 2,
  }).notNull(),
  projectValue: decimal("project_value", {
    precision: 15,
    scale: 2,
  }).notNull(),
  category: varchar("category", { length: 10 }).notNull(),
  date: date("date").notNull(),
});

// Define the `payments` table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id, {
      onDelete: "restrict",
    })
    .notNull(),
  projectCode: varchar("project_code", { length: 50 }).notNull(), // No foreign key constraint
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 10 }).notNull(), // 'debit' or 'credit'
  date: date("date").notNull(),
  email: varchar("email", { length: 100 }).notNull(),
});

// Define Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  company: one(companies),
  payments: many(payments, { relationName: "project_payments" }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  project: one(projects),
}));
