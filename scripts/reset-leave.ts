import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function resetTables() {
  await AppDataSource.initialize();
  console.log('Database initialized');
  await AppDataSource.query('DROP TABLE IF EXISTS "leave_approval_flows" CASCADE');
  await AppDataSource.query('DROP TABLE IF EXISTS "leave_requests" CASCADE');
  await AppDataSource.query('DROP TABLE IF EXISTS "leave_balances" CASCADE');
  console.log('Dropped leave tables. Restarting backend will recreate them.');
  await AppDataSource.destroy();
}

resetTables().catch(console.error);
