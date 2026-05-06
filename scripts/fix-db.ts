import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fix() {
  await AppDataSource.initialize();
  console.log('Database initialized');
  await AppDataSource.query('DELETE FROM leave_balances WHERE "employeeId" IS NULL');
  await AppDataSource.query('DELETE FROM leave_requests WHERE "employeeId" IS NULL');
  console.log('Deleted null employeeId records');
  await AppDataSource.destroy();
}

fix().catch(console.error);
