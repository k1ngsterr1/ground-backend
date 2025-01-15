import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        createdAt: false,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async changeRole(id: number, role: string) {
    const user = await this.findOne(id);

    if (role === 'user') {
      // Demote user from manager/admin to user
      return this.prisma.user.update({
        where: { id },
        data: { role: 'user' },
      });
    }

    // Promote user to manager/admin
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}
