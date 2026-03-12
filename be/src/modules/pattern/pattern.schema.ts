import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatternDocument = HydratedDocument<Pattern>;

@Schema()
export class Pattern {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [Boolean], required: true })
  cells: boolean[];
}

export const PatternSchema = SchemaFactory.createForClass(Pattern);
