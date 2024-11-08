CREATE TABLE IF NOT EXISTS "history" (
	"reference_id" integer NOT NULL,
	"reference_type" varchar(10) NOT NULL,
	"description" text,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_reference" ON "history" USING btree (reference_id,reference_type);