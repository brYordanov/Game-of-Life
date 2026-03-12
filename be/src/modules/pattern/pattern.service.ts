import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pattern, PatternDocument } from './pattern.schema';

@Injectable()
export class PatternService {
  constructor(
    @InjectModel(Pattern.name) private patternModel: Model<PatternDocument>,
  ) {}

  findAll() {
    return this.patternModel.find().select('name description').exec();
  }

  findById(id: string) {
    return this.patternModel.findById(id).exec();
  }
}
