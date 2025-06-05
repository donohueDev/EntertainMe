/*
  Warnings:

  - Made the column `content_filters` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_activity` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_login` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preferences` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verification_token" TEXT,
ADD COLUMN     "verification_token_expires" TIMESTAMP(3),
ALTER COLUMN "content_filters" SET NOT NULL,
ALTER COLUMN "last_activity" SET NOT NULL,
ALTER COLUMN "last_activity" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "last_login" SET NOT NULL,
ALTER COLUMN "last_login" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "login_count" SET DEFAULT 1,
ALTER COLUMN "preferences" SET NOT NULL;
