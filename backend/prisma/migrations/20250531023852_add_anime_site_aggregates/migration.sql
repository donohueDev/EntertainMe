-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "site_added" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "site_added_by_status" JSONB DEFAULT '{"watching":0,"planned":0,"completed":0,"dropped":0}',
ADD COLUMN     "site_rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "site_ratings" JSONB DEFAULT '{}',
ADD COLUMN     "site_ratings_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "site_reviews_count" INTEGER NOT NULL DEFAULT 0;
