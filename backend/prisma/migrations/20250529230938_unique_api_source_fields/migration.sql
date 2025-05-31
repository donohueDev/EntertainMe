/*
  Warnings:

  - A unique constraint covering the columns `[api_source,api_source_id]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[api_source,api_source_id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Made the column `source` on table `Anime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "api_source" TEXT,
ADD COLUMN     "api_source_id" TEXT,
ALTER COLUMN "source" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "api_source" TEXT,
ADD COLUMN     "api_source_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Anime_api_source_api_source_id_key" ON "Anime"("api_source", "api_source_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_api_source_api_source_id_key" ON "Game"("api_source", "api_source_id");
