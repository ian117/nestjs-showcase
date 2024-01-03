import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ExtendedFilter } from './common/filters/extended.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            // envFilePath
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    // .required()
                    .default('development')
                    .valid('development', 'test', 'production'),
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().default(5432),
            }),
        }),
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres', // type of our database
            host: process.env.DATABASE_HOST, // database host
            port: +process.env.DATABASE_PORT, // database host
            username: process.env.DATABASE_USER, // username
            password: process.env.DATABASE_PASSWORD, // user password
            database: process.env.DATABASE_NAME, // name of our database,
            autoLoadEntities: false, // models will be loaded automatically
            synchronize: false, // your entities will be synced with the database(recommended: disable in prod)
        }),
        CoffeeRatingModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'APP_FILTER',
            useClass: ExtendedFilter,
        },
    ],
})
export class AppModule {}
