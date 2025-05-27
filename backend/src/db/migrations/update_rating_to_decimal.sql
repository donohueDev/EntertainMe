-- First, create a temporary column
ALTER TABLE user_games ADD COLUMN rating_new DECIMAL(3,1);

-- Copy data from old column to new column
UPDATE user_games SET rating_new = rating::DECIMAL(3,1);

-- Drop the old column
ALTER TABLE user_games DROP COLUMN rating;

-- Rename the new column to the original name
ALTER TABLE user_games RENAME COLUMN rating_new TO rating; 