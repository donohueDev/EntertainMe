-- Make columns required and set defaults
DO $$ 
BEGIN 
    -- Update any NULL values to defaults before making columns required
    UPDATE "User" 
    SET content_filters = '{}' 
    WHERE content_filters IS NULL;

    UPDATE "User" 
    SET preferences = '{}' 
    WHERE preferences IS NULL;

    UPDATE "User" 
    SET last_activity = CURRENT_TIMESTAMP 
    WHERE last_activity IS NULL;

    UPDATE "User" 
    SET last_login = CURRENT_TIMESTAMP 
    WHERE last_login IS NULL;

    UPDATE "User" 
    SET login_count = 1 
    WHERE login_count IS NULL;
END $$;

-- Now make columns required and set defaults
ALTER TABLE "User" 
    ALTER COLUMN "content_filters" SET NOT NULL,
    ALTER COLUMN "content_filters" SET DEFAULT '{}',
    ALTER COLUMN "last_activity" SET NOT NULL,
    ALTER COLUMN "last_activity" SET DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "last_login" SET NOT NULL,
    ALTER COLUMN "last_login" SET DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "login_count" SET NOT NULL,
    ALTER COLUMN "login_count" SET DEFAULT 1,
    ALTER COLUMN "preferences" SET NOT NULL,
    ALTER COLUMN "preferences" SET DEFAULT '{}';
