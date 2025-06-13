/*
  Warnings:

  - A unique constraint covering the columns `[display_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_display_name_key" ON "User"("display_name");
