import { PrismaClient } from '@prisma/client';

async function fixMigrations() {
  const prisma = new PrismaClient();
  
  try {
    // First ensure the problematic migration is marked as applied
    await prisma.$executeRaw`
      DELETE FROM _prisma_migrations 
      WHERE migration_name = '20250604225151_complete_user_model';
    `;

    // Update status of earlier migrations
    await prisma.$executeRaw`
      UPDATE _prisma_migrations 
      SET applied_steps_count = 1, 
          finished_at = CURRENT_TIMESTAMP 
      WHERE migration_name IN (
        '20250604001000_add_email_verification_fields',
        '20250604002000_complete_user_model'
      )
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
