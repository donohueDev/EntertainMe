/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Top100Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Top100Game";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserGame";

-- CreateTable
CREATE TABLE "GameCollection" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "released" TEXT,
    "tba" BOOLEAN,
    "background_image" TEXT,
    "rating" DOUBLE PRECISION,
    "rating_top" INTEGER,
    "ratings_count" INTEGER,
    "reviews_text_count" INTEGER,
    "added" INTEGER,
    "metacritic" INTEGER,
    "playtime" INTEGER,
    "suggestions_count" INTEGER,
    "updated" TEXT,
    "user_game" INTEGER,
    "reviews_count" INTEGER,
    "saturated_color" TEXT,
    "dominant_color" TEXT,
    "esrb_rating" TEXT,
    "description_raw" TEXT,

    CONSTRAINT "GameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCollection" (
    "mal_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_english" TEXT,
    "title_japanese" TEXT,
    "synopsis" TEXT,
    "background" TEXT,
    "type" TEXT,
    "source" TEXT,
    "episodes" INTEGER,
    "status" TEXT,
    "airing" BOOLEAN NOT NULL,
    "aired_from" TIMESTAMP(3),
    "aired_to" TIMESTAMP(3),
    "duration" TEXT,
    "rating" TEXT,
    "score" DOUBLE PRECISION,
    "scored_by" INTEGER,
    "rank" INTEGER,
    "popularity" INTEGER,
    "members" INTEGER,
    "favorites" INTEGER,
    "season" TEXT,
    "year" INTEGER,
    "approved" BOOLEAN NOT NULL,
    "broadcast_day" TEXT,
    "broadcast_time" TEXT,
    "broadcast_timezone" TEXT,
    "broadcast_string" TEXT,
    "trailer_url" TEXT,
    "trailer_youtube_id" TEXT,
    "trailer_embed_url" TEXT,
    "image_url" TEXT,
    "image_large_url" TEXT,
    "image_small_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimeCollection_pkey" PRIMARY KEY ("mal_id")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGameCollection" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Top100GameCollection" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Top100GameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCollection_email_key" ON "UserCollection"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollection_username_key" ON "UserCollection"("username");

-- CreateIndex
CREATE INDEX "UserGameCollection_user_id_idx" ON "UserGameCollection"("user_id");

-- CreateIndex
CREATE INDEX "UserGameCollection_game_id_idx" ON "UserGameCollection"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameCollection_user_id_game_id_key" ON "UserGameCollection"("user_id", "game_id");

-- CreateIndex
CREATE INDEX "Top100GameCollection_game_id_idx" ON "Top100GameCollection"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Top100GameCollection_rank_key" ON "Top100GameCollection"("rank");
