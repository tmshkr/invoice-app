import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [InvoicesService, PrismaService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
