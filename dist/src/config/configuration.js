"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'cfadmin',
        password: process.env.DB_PASSWORD || 'cfpassword',
        database: process.env.DB_DATABASE || 'capitalfield_hr',
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: false,
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'capital-field-jwt-secret-change-me',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'capital-field-refresh-secret-change-me',
        accessTokenTtl: '15m',
        refreshTokenTtl: '7d',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        user: process.env.REDIS_USER || 'default',
    },
    s3: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        bucket: process.env.AWS_S3_BUCKET_NAME || 'capitalfield-hr-docs',
        region: process.env.AWS_REGION || 'af-south-1',
    },
    email: {
        resendApiKey: process.env.RESEND_API_KEY || '',
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
});
//# sourceMappingURL=configuration.js.map