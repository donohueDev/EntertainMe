-- Fix email verification fields
DO $$ 
BEGIN 
    -- Check if email_verified column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'User' 
                  AND column_name = 'email_verified') THEN
        ALTER TABLE "User" ADD COLUMN "email_verified" BOOLEAN NOT NULL DEFAULT false;
    END IF;

    -- Check if verification_token column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'User' 
                  AND column_name = 'verification_token') THEN
        ALTER TABLE "User" ADD COLUMN "verification_token" TEXT;
    END IF;

    -- Check if verification_token_expires column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'User' 
                  AND column_name = 'verification_token_expires') THEN
        ALTER TABLE "User" ADD COLUMN "verification_token_expires" TIMESTAMP;
    END IF;
END $$;
