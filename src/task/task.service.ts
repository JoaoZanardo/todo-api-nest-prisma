import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

type objectErrorType = {
  error: string;
};

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task | objectErrorType> {
    const user = await this.prisma.task.findFirst({ where: { id } });
    if (!user) return { error: `User not found` };
    return user;
  }

  async update(
    id: number,
    data: UpdateTaskDto,
  ): Promise<Task | objectErrorType> {
    const user = await this.prisma.task.findFirst({ where: { id } });
    if (!user) return { error: `User not found` };
    return await this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Task | objectErrorType> {
    const user = await this.prisma.task.findFirst({ where: { id } });
    if (!user) return { error: `User not found` };
    return await this.prisma.task.delete({ where: { id } });
  }
}
