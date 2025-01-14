import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ComparisonsController } from './comparison.controller';
import { ComparisonsService } from './comparison.service';

@Module({
  controllers: [ComparisonsController],
  providers: [ComparisonsService, PrismaService],
})
export class ComparisonsModule {}
