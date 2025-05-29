/*
  Warnings:

  - You are about to drop the `animeCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gameCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `top50GameCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userGameCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "animeCollection";

-- DropTable
DROP TABLE "gameCollection";

-- DropTable
DROP TABLE "top50GameCollection";

-- DropTable
DROP TABLE "userCollection";

-- DropTable
DROP TABLE "userGameCollection";

-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
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

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
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
    "reviews_count" INTEGER,
    "saturated_color" TEXT,
    "dominant_color" TEXT,
    "esrb_rating" TEXT,
    "description_raw" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGame" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "rating" INTEGER,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnime" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "rating" INTEGER,
    "status" TEXT,
    "episodes_watched" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Top50Games" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Top50Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_mal_id_key" ON "Anime"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_slug_key" ON "Anime"("slug");

-- CreateIndex
CREATE INDEX "Anime_title_idx" ON "Anime"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "Game_name_idx" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_email_idx" ON "User"("username", "email");

-- CreateIndex
CREATE INDEX "UserGame_rating_idx" ON "UserGame"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_userId_gameId_key" ON "UserGame"("userId", "gameId");

-- CreateIndex
CREATE INDEX "UserAnime_rating_idx" ON "UserAnime"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnime_userId_animeId_key" ON "UserAnime"("userId", "animeId");

-- CreateIndex
CREATE INDEX "Top50Games_game_id_idx" ON "Top50Games"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Top50Games_rank_key" ON "Top50Games"("rank");

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
