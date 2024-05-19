CREATE TABLE IF NOT EXISTS "lobby" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" text,
	"lobby_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"steam_id" text,
	"display_name" text,
	"lobby_id" integer,
	CONSTRAINT "user_steam_id_unique" UNIQUE("steam_id"),
	CONSTRAINT "user_display_name_unique" UNIQUE("display_name")
);
