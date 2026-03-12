import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatternDocument = HydratedDocument<Pattern>;

@Schema()
export class Pattern {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop()
  description: string;

  @Prop({ type: [Boolean], required: true })
  cells: boolean[];
}

export const PatternSchema = SchemaFactory.createForClass(Pattern);
