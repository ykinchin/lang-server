import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  providers: [NoteService, PrismaService],
  controllers: [NoteController],
  exports: [NoteService],
})
export class NoteModule {}
