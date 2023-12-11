import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user
      .create({
        data,
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          throw new UnauthorizedException('Email already exists');
        }
        throw err;
      });
  }
}
