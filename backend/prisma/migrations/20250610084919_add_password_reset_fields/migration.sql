-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expires" TIMESTAMP(3),
ALTER COLUMN "verification_token_expires" SET DATA TYPE TIMESTAMP(3);
