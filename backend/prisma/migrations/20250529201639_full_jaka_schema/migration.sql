-- CreateTable
CREATE TABLE "Top50Anime" (
    "id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Top50Anime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Top50Anime_anime_id_idx" ON "Top50Anime"("anime_id");

-- CreateIndex
CREATE UNIQUE INDEX "Top50Anime_rank_key" ON "Top50Anime"("rank");

-- AddForeignKey
ALTER TABLE "Top50Anime" ADD CONSTRAINT "Top50Anime_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
