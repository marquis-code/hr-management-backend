import { User } from './user.entity';
export declare class Permission {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
