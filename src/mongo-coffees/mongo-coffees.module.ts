import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeSchema, MongoCoffee } from './entities/coffee.entity';
import { MongoCoffeesController } from './mongo-coffees.controller';
import { MongoCoffeesService } from './mongo-coffees.service';
import {
    MongoEvent,
    MongoEventSchema,
} from 'src/events/entities/mongo-event.entity';

@Module({
    providers: [MongoCoffeesService],
    controllers: [MongoCoffeesController],
    imports: [
        MongooseModule.forFeature([
            {
                name: MongoCoffee.name,
                schema: CoffeeSchema,
            },
            {
                name: MongoEvent.name,
                schema: MongoEventSchema,
            },
        ]),
    ],
})
export class MongoCoffeesModule {}
