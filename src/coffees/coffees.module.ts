import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    COFFEE_BRANDS,
    COFFEE_BRANDS_FACTORY_LAMBDA,
    COFFEE_BRANDS_FACTORY_INJECT,
} from './coffees.constants';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';

import { CoffeesService } from './coffees.service';

import { CoffeesController } from './coffees.controller';

/*  Class Providers are ideal for  ConfigServices for example */
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

/* Factory Providers are ideal for compute values and inject them  */
@Injectable()
export class CoffeeBrandsFactory {
    create() {
        /* Tasks */
        return ['Mr Coffe Dope', 'nescafe'];
    }
}

@Module({
    controllers: [CoffeesController],
    exports: [CoffeesService],
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    providers: [
        CoffeesService,
        { provide: COFFEE_BRANDS, useValue: ['buddy_brew', 'nescafe'] },
        /* Class Provider */
        {
            provide: ConfigService,
            useClass:
                process.env.NODE_ENV == 'development'
                    ? DevelopmentConfigService
                    : ProductionConfigService,
        },
        /* 2 ways to use Factory providers
        1° its to make an lamda function
        2° Using an array of Providers to compute the value
        */
        {
            provide: COFFEE_BRANDS_FACTORY_LAMBDA,
            useFactory: () => {
                ['dr coffee', 'coke coffee'];
            },
        },
        /** We have to import or add the Provider that we are gona use in the factory*/
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS_FACTORY_INJECT,
            useFactory: (brandsFactory: CoffeeBrandsFactory) =>
                brandsFactory.create(), // will return the array
            inject: [CoffeeBrandsFactory],
        },
    ],
})
export class CoffeesModule {}
