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
    "user_game" INTEGER,
    "reviews_count" INTEGER,
    "saturated_color" TEXT,
    "dominant_color" TEXT,
    "esrb_rating" TEXT,
    "description_raw" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
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

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("mal_id")
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
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Top100Game" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Top100Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "UserGame_user_id_idx" ON "UserGame"("user_id");

-- CreateIndex
CREATE INDEX "UserGame_game_id_idx" ON "UserGame"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_user_id_game_id_key" ON "UserGame"("user_id", "game_id");

-- CreateIndex
CREATE INDEX "Top100Game_game_id_idx" ON "Top100Game"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Top100Game_rank_key" ON "Top100Game"("rank");
