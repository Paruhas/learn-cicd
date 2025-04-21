import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { requestCreateUserDto } from './dto/create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  create(@Body() body: requestCreateUserDto) {
    return this.userService.createOneUser(body);
  }
}
