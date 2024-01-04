import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { MongoCoffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dyo/pagination-query.dyo';
import { MongoEvent } from 'src/events/entities/mongo-event.entity';

@Injectable()
export class MongoCoffeesService {
    constructor(
        @InjectModel(MongoCoffee.name)
        private readonly coffeeModel: Model<MongoCoffee>,
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(MongoEvent.name)
        private readonly mongoEventModel: Model<MongoEvent>,
    ) {}
    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeModel.find().skip(offset).limit(limit).exec();
    }

    async findOne(id: string) {
        const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = new this.coffeeModel(createCoffeeDto);
        return coffee.save();
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeeModel
            .findOneAndUpdate(
                { _id: id },
                { $set: updateCoffeeDto },
                { new: true },
            )
            .exec();

        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return existingCoffee;
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        // return coffee.remove(); // TODO find remove mongoose
    }
    async recommendCoffee(coffee: MongoCoffee) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            coffee.recommendations++;

            const recommendEvent = new this.mongoEventModel({
                name: 'recommend_coffee',
                type: 'coffee',
                payload: { coffeeId: coffee.id },
            });
            await recommendEvent.save({ session });
            await coffee.save({ session });

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
    }
}
