import { Database } from 'sqlite3';

export function initDatabase(): Promise<Database>;
export function getDatabase(): Database; 