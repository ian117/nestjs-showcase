import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MongoCoffee extends Document {
    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop({ default: 0 })
    recommendations: number;

    @Prop([String])
    flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(MongoCoffee);
