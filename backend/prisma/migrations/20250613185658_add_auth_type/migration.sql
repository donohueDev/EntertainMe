-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('LOCAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'LOCAL';
