import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from '../prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        notes: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const totalNotes = profile.notes.length;
    const completedNotes = await this.prisma.note.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const { password, ...rest } = profile;

    return {
      user: rest,
      statistics: [
        {
          label: 'Total',
          value: totalNotes,
        },
        {
          label: 'Completed notes',
          value: completedNotes,
        },
      ],
    };
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  }
}
