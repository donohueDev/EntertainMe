import { PrismaClient } from '@prisma/client';

async function fixMigrations() {
  const prisma = new PrismaClient();
  
  try {
    // Check and update _prisma_migrations table
    await prisma.$executeRaw`
      UPDATE _prisma_migrations 
      SET applied_steps_count = 1, 
          finished_at = NOW() 
      WHERE migration_name = '20250604001000_add_email_verification_fields'
      AND finished_at IS NULL;
    `;

    console.log('Migration state fixed successfully');
  } catch (error) {
    console.error('Error fixing migration state:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixMigrations().catch(console.error);
