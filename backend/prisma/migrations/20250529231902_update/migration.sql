/*
  Warnings:

  - Made the column `api_source` on table `Anime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `api_source_id` on table `Anime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `api_source` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `api_source_id` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Anime" ALTER COLUMN "api_source" SET NOT NULL,
ALTER COLUMN "api_source_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "api_source" SET NOT NULL,
ALTER COLUMN "api_source_id" SET NOT NULL;
