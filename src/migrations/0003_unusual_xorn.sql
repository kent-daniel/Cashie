ALTER TABLE "projects" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "category";