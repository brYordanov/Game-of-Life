import { Controller, Get, Param } from '@nestjs/common';
import { PatternService } from './pattern.service';

@Controller('patterns')
export class PatternController {
  constructor(private readonly patternService: PatternService) {}

  @Get()
  findAll() {
    return this.patternService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.patternService.findById(id);
  }
}
