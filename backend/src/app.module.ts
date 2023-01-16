import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.mariadb;
      },
      inject: [ConfigService],
    }),
    CommonModule,
  ],
})
export class AppModule {}
