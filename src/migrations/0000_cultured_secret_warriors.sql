CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_code" varchar(50) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text,
	"category" varchar(10) NOT NULL,
	"date" date NOT NULL,
	"email" varchar(100) NOT NULL
);
