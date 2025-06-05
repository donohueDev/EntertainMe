# Load environment variables and run the specified command
source ../.env 2>/dev/null || true  # Try to load .env if it exists, don't error if it doesn't

# Generate Prisma Client
npx prisma generate

# Execute the command passed to the script
exec "$@"
