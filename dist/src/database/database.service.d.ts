import { ConfigService } from '@nestjs/config';
export declare class DatabaseService {
    private configService;
    private readonly sql;
    constructor(configService: ConfigService);
    query(strings: TemplateStringsArray, ...values: any[]): Promise<any>;
}
