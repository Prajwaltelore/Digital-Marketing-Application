import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUser } from './dtos/createUser';
import { updateUser } from './dtos/updateUser';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() userdetails: createUser) {
    const hashPassword = await bcrypt.hash(userdetails.password, 10);
    return await this.usersService.create(userdetails, hashPassword);
  }

  @Get('register/:id')
  async getById(@Param() id: number) {
    return await this.usersService.getById(id);
  }

  @Get()
  async get() {
    return await this.usersService.getUser();
  }
  @Put('register/:id')
  async updateById(@Body() packages: updateUser, id: any) {
    return await this.usersService.update(packages, id);
  }

  @Delete('register/:id')
  async delete(@Param() id: number) {
    return await this.usersService.delete(id);
  }
}
