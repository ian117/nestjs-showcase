import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { COFFEE_BRANDS } from './coffees.constants';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';

import { CoffeesService } from './coffees.service';

import { CoffeesController } from './coffees.controller';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
    controllers: [CoffeesController],
    exports: [CoffeesService],
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    providers: [
        CoffeesService,
        { provide: COFFEE_BRANDS, useValue: ['buddy_brew', 'nescafe'] },
        {
            provide: ConfigService,
            useClass:
                process.env.NODE_ENV == 'development'
                    ? DevelopmentConfigService
                    : ProductionConfigService,
        },
    ],
})
export class CoffeesModule {}
