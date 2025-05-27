/*
  Warnings:

  - You are about to drop the `top100GameCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "top100GameCollection";

-- CreateTable
CREATE TABLE "top50GameCollection" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "top50GameCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "top50GameCollection_game_id_idx" ON "top50GameCollection"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "top50GameCollection_rank_key" ON "top50GameCollection"("rank");
