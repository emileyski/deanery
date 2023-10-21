import { Controller, Get, UseGuards } from '@nestjs/common';
import { EntrantsService } from './entrants.service';
import { AuthorizatedMiddleware } from 'src/middlewares/require-auth.middleware';
import { RoleGuard } from 'src/middlewares/role.guard';
import { GetUser } from 'src/user/user.decorator';

@Controller('entrant')
export class EntrantsController {
  constructor(private readonly entrantsService: EntrantsService) {}

  @Get()
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  getMyEntrantsData(@GetUser() user) {
    return this.entrantsService.findById(user.id);
  }
}
