import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ImportUsersDto } from './dto/import-users.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Post()
  @HttpCode(201)
  async importUsers(@Body() importUsersDto: ImportUsersDto) {
    return this.usersService.importUsers(importUsersDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteAll() {
    await this.usersService.clearAll();
  }
}
