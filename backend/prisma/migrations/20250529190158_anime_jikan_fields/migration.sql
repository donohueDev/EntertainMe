/*
  Warnings:

  - You are about to drop the column `image_large_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `image_small_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_embed_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `trailer_youtube_id` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "image_large_url",
DROP COLUMN "image_small_url",
DROP COLUMN "image_url",
DROP COLUMN "trailer_embed_url",
DROP COLUMN "trailer_url",
DROP COLUMN "trailer_youtube_id",
ADD COLUMN     "aired_prop" JSONB,
ADD COLUMN     "aired_string" TEXT,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "title_synonyms" TEXT[],
ADD COLUMN     "trailer" JSONB,
ADD COLUMN     "url" TEXT;

-- CreateTable
CREATE TABLE "AnimeTitle" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "AnimeTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeProducer" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "AnimeProducer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimeTitle" ADD CONSTRAINT "AnimeTitle_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeProducer" ADD CONSTRAINT "AnimeProducer_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
