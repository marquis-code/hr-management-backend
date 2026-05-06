import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    private readonly sql;

    constructor(private configService: ConfigService) {
        const databaseUrl = this.configService.get<string>('DATABASE_URL');
        if (databaseUrl) {
            this.sql = neon(databaseUrl);
        }
    }

    async query(strings: TemplateStringsArray, ...values: any[]) {
        if (!this.sql) {
            throw new Error('DATABASE_URL not configured for Neon Serverless');
        }
        return await this.sql(strings, ...values);
    }
}
