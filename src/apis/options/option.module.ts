import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionResolver } from './option.resolver';
import { OptionService } from './option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option, //
    ]),
  ],
  providers: [
    OptionResolver, //
    OptionService,
  ],
})
export class OptionModule {}
