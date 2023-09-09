import type { Config } from 'drizzle-kit';
import process from 'process';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_DB_URL as string,
  },
} satisfies Config;
