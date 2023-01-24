import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Option } from './entities/option.entity';
import { OptionResolver } from './option.resolver';
import { OptionService } from './option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option, //
      Question,
    ]),
  ],
  providers: [
    OptionResolver, //
    OptionService,
  ],
})
export class OptionModule {}
