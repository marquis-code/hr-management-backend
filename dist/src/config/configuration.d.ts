declare const _default: () => {
    database: {
        type: "postgres";
        url: string | undefined;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: boolean;
        logging: boolean;
        ssl: boolean | {
            rejectUnauthorized: boolean;
        };
    };
    jwt: {
        secret: string;
        refreshSecret: string;
        accessTokenTtl: string;
        refreshTokenTtl: string;
    };
    redis: {
        host: string;
        port: number;
        password: string | undefined;
        user: string;
    };
    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        bucket: string;
        region: string;
    };
    email: {
        resendApiKey: string;
        from: string;
    };
    frontendUrl: string;
};
export default _default;
