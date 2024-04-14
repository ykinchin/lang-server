import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { NoteDto } from './note.dto';
import { NoteService } from './note.service';

@Controller('user/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.noteService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: NoteDto, @CurrentUser('id') userId: string) {
    return this.noteService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: NoteDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.noteService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
