import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatternModule } from './modules/pattern/pattern.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:123@localhost:27017/mydb?authSource=admin',
    ),
    PatternModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
