import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NoteDto } from './note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async create(dto: NoteDto, userId: string) {
    return this.prisma.note.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<NoteDto>, noteId: string, userId: string) {
    return this.prisma.note.update({
      where: {
        userId,
        id: noteId,
      },
      data: dto,
    });
  }

  async delete(noteId: string) {
    return this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
