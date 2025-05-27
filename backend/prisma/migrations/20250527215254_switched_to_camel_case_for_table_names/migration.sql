/*
  Warnings:

  - You are about to drop the `AnimeCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Top100GameCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGameCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AnimeCollection";

-- DropTable
DROP TABLE "GameCollection";

-- DropTable
DROP TABLE "Top100GameCollection";

-- DropTable
DROP TABLE "UserCollection";

-- DropTable
DROP TABLE "UserGameCollection";

-- CreateTable
CREATE TABLE "gameCollection" (
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

    CONSTRAINT "gameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animeCollection" (
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

    CONSTRAINT "animeCollection_pkey" PRIMARY KEY ("mal_id")
);

-- CreateTable
CREATE TABLE "userCollection" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGameCollection" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userGameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "top100GameCollection" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "top100GameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userCollection_email_key" ON "userCollection"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userCollection_username_key" ON "userCollection"("username");

-- CreateIndex
CREATE INDEX "userGameCollection_user_id_idx" ON "userGameCollection"("user_id");

-- CreateIndex
CREATE INDEX "userGameCollection_game_id_idx" ON "userGameCollection"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "userGameCollection_user_id_game_id_key" ON "userGameCollection"("user_id", "game_id");

-- CreateIndex
CREATE INDEX "top100GameCollection_game_id_idx" ON "top100GameCollection"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "top100GameCollection_rank_key" ON "top100GameCollection"("rank");
