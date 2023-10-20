import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from './user/user.decorator';
import { AuthorizatedMiddleware } from './middlewares/require-auth.middleware';
// import { RoleCheckMiddleware } from './middlewares/role-check.middleware';
import { RoleGuard } from './middlewares/role.guard';
import { UserDto } from './user/user.dto';

// @UseGuards(RoleCheckMiddleware)
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello';
  }

  @Get('user')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  getUser(@GetUser() user: UserDto) {
    // console.log(user);
    return user;
  }
}
