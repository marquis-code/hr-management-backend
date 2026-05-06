import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, Permission } from '../src/modules/auth/entities';
import { UserRole } from '../src/common/enums';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Role, Permission],
  synchronize: false,
  ssl: { rejectUnauthorized: false }
});

async function resetAdmin() {
  await AppDataSource.initialize();
  console.log('Database initialized');

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  const email = 'admin@capitalfield.com';
  const password = 'password123';
  const passwordHash = await bcrypt.hash(password, 12);

  let admin = await userRepository.findOne({ where: { email } });
  
  if (admin) {
    admin.passwordHash = passwordHash;
    admin.systemRole = UserRole.SUPER_ADMIN;
    await userRepository.save(admin);
    console.log('Admin password reset successfully');
  } else {
    // Try to find any user and make them admin if needed, or create new
    admin = userRepository.create({
      email,
      passwordHash,
      systemRole: UserRole.SUPER_ADMIN,
      isActive: true
    });
    await userRepository.save(admin);
    console.log('Admin created successfully');
  }

  await AppDataSource.destroy();
}

resetAdmin().catch(console.error);
