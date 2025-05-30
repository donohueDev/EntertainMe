-- AlterTable
ALTER TABLE "User" ADD COLUMN     "anime_reviews_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "completed_anime_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "completed_games_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "content_filters" JSONB DEFAULT '{}',
ADD COLUMN     "display_name" TEXT,
ADD COLUMN     "dropped_anime_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dropped_games_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "game_reviews_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_activity" TIMESTAMP(3),
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "login_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "planned_anime_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "planned_games_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "playing_games_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "preferences" JSONB DEFAULT '{}',
ADD COLUMN     "total_reviews_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "watching_anime_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" TEXT;
