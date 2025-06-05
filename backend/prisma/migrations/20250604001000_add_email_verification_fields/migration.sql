-- Add email verification fields to User model
ALTER TABLE "User"
ADD COLUMN "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verification_token" TEXT,
ADD COLUMN "verification_token_expires" TIMESTAMP;
