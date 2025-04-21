import { Injectable } from '@nestjs/common';

import { requestCreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  findAllUser() {
    return {
      msg: 'findAllUser',
    };
  }

  findUserById(id: string) {
    return {
      msg: 'findUserById',
      id,
    };
  }

  createOneUser(body: requestCreateUserDto) {
    return {
      msg: 'createOneUser',
      ...body,
    };
  }
}
