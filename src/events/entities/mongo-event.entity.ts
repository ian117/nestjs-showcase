import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class MongoEvent extends mongoose.Document {
    // Note "entity" was removed from the class "name"
    @Prop()
    type: string;

    @Prop({ index: true })
    name: string;

    @Prop(mongoose.SchemaTypes.Mixed)
    payload: Record<string, any>;
}

export const MongoEventSchema = SchemaFactory.createForClass(MongoEvent);
// MongoEventSchema.index({ name: 1, type: -1 });
// Multiple indexes
