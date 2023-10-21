import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AuthorizatedMiddleware } from 'src/middlewares/require-auth.middleware';
import { RoleGuard } from 'src/middlewares/role.guard';
import { Roles } from '@deanery-common/shared';
import { GetUser } from 'src/user/user.decorator';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Enrollee))
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @GetUser() user: any,
  ) {
    return this.applicationsService.createApplication(
      createApplicationDto,
      user,
    );
  }

  @Get()
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Dean))
  getAvailableApplications() {
    return this.applicationsService.getAvailableApplications();
  }

  @Post('apply/:id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Dean))
  acceptApplication(@Param('id') id: string) {
    return this.applicationsService.applyApplication(id);
  }
}
