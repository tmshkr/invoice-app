import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Bill } from '@prisma/client';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  async create(user_id, bills: any[]): Promise<{ count: number }> {
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    return await this.prisma.bill.createMany({
      data: bills.map((bill) => ({ ...bill, user_id })),
    });
  }

  async findOne(user_id: string, id: string): Promise<Bill> {
    if (!id) {
      throw new InternalServerErrorException('Bill ID is required');
    }
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    const [bill] = await this.prisma.bill.findMany({
      where: { id, user_id },
    });

    if (!bill) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }

    return bill;
  }

  async findMany(user_id: string): Promise<Bill[]> {
    if (!user_id) {
      throw new InternalServerErrorException('User ID is required');
    }

    const bills = await this.prisma.bill.findMany({
      where: { user_id },
    });

    if (!bills.length) {
      throw new NotFoundException(`Bills for user ${user_id} not found`);
    }

    return bills;
  }
}
