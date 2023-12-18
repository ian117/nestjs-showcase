import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

import { CoffeesService } from './coffees.service';

import { CoffeesController } from './coffees.controller';

@Module({
    controllers: [CoffeesController],
    exports: [],
    imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
    providers: [CoffeesService],
})
export class CoffeesModule {}
