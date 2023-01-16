import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/record.entity';
import { DomainMetaData } from '../entities/domain-metadata.entity';
import { Domain } from '../entities/domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Domain, DomainMetaData])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
