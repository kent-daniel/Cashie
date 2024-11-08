ALTER TABLE "payments" ADD COLUMN "is_edited" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;