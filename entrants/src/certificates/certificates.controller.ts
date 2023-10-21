import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizatedMiddleware } from 'src/middlewares/require-auth.middleware';
import { RoleGuard } from 'src/middlewares/role.guard';
import { GetUser } from 'src/user/user.decorator';
import { Response } from 'express';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  @UseInterceptors(FileInterceptor('certificate'))
  create(
    @Body() createCertificateDto: any,
    @UploadedFile() file,
    @GetUser() user,
  ) {
    const enrolleeId = user.id;
    return this.certificatesService.create(
      createCertificateDto,
      file,
      enrolleeId,
    );
  }

  @Get(':id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  async findOne(
    @Param('id') id: string,
    @GetUser() { id: enrolleeId },
    @Res() res: Response,
  ) {
    const certificate = await this.certificatesService.findOneByEntrantId(
      id,
      enrolleeId,
    );

    // Устанавливаем заголовок Content-Disposition для скачивания файла
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${certificate.filename}`,
    );

    // Отправляем содержимое файла в ответ
    res.send(certificate.data);
  }

  @Delete(':id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  async deleteCertificateById(
    @GetUser() { id: enrolleeId },
    @Param('id') id: string,
  ) {
    return this.certificatesService.remove(id, enrolleeId);
  }
}
