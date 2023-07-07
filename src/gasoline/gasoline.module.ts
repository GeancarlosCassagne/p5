import { Module } from '@nestjs/common';
import { GasolineController } from './gasoline.controller';
import { GasolineService } from './gasoline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasoline } from './gasoline.entity';

@Module({
  controllers: [GasolineController],
  imports: [TypeOrmModule.forFeature([Gasoline])],
  providers: [GasolineService],
  exports: [GasolineService, TypeOrmModule],
})
export class GasolineModule {}
