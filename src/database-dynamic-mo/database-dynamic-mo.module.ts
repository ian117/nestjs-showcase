import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseDynamicMoModule {
    static register(options: DataSourceOptions): DynamicModule {
        return {
            module: DatabaseDynamicMoModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: new DataSource(options).initialize(),
                },
            ],
        };
    }
}
