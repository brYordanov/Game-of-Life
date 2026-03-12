import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pattern, PatternSchema } from './pattern.schema';
import { PatternService } from './pattern.service';
import { PatternController } from './patterm.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pattern.name, schema: PatternSchema }]),
  ],
  controllers: [PatternController],
  providers: [PatternService],
})
export class PatternModule {}
