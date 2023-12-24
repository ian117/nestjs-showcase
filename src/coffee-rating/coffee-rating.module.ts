import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseDynamicMoModule } from 'src/database-dynamic-mo/database-dynamic-mo.module';

@Module({
    imports: [
        CoffeesModule,

        /* Dynamic Module */
        /* Dynamic Module Will Allow to use the .register() method
        to pass values to be instancied */

        // DatabaseDynamicMoModule.register({
        //     type: 'postgres',
        //     host: 'localhost',
        //     port: 5432,
        // }),
    ],
    providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
