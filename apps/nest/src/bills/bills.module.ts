import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BillsService, PrismaService],
  exports: [BillsService],
})
export class BillsModule {}
