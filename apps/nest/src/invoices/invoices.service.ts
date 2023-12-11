import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(user_id, invoices: any[]): Promise<{ count: number }> {
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    return await this.prisma.invoice.createMany({
      data: invoices.map((invoice) => ({ ...invoice, user_id })),
    });
  }

  async findOne(user_id: string, id: string): Promise<Invoice> {
    if (!id) {
      throw new InternalServerErrorException('Invoice ID is required');
    }
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    const [invoice] = await this.prisma.invoice.findMany({
      where: { id, user_id },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async findMany(user_id: string): Promise<Invoice[]> {
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    const invoices = await this.prisma.invoice.findMany({
      where: { user_id },
    });

    if (!invoices.length) {
      throw new NotFoundException(`Invoices for user ${user_id} not found`);
    }

    return invoices;
  }
}
