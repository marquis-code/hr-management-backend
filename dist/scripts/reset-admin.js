"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../src/modules/auth/entities");
const enums_1 = require("../src/common/enums");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [entities_1.User, entities_1.Role, entities_1.Permission],
    synchronize: false,
    ssl: { rejectUnauthorized: false }
});
async function resetAdmin() {
    await AppDataSource.initialize();
    console.log('Database initialized');
    const userRepository = AppDataSource.getRepository(entities_1.User);
    const roleRepository = AppDataSource.getRepository(entities_1.Role);
    const email = 'admin@capitalfield.com';
    const password = 'password123';
    const passwordHash = await bcrypt.hash(password, 12);
    let admin = await userRepository.findOne({ where: { email } });
    if (admin) {
        admin.passwordHash = passwordHash;
        admin.systemRole = enums_1.UserRole.SUPER_ADMIN;
        await userRepository.save(admin);
        console.log('Admin password reset successfully');
    }
    else {
        admin = userRepository.create({
            email,
            passwordHash,
            systemRole: enums_1.UserRole.SUPER_ADMIN,
            isActive: true
        });
        await userRepository.save(admin);
        console.log('Admin created successfully');
    }
    await AppDataSource.destroy();
}
resetAdmin().catch(console.error);
//# sourceMappingURL=reset-admin.js.map