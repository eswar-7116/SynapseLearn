import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from '@/db/schema';

// neonConfig.fetch = fetch;

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });