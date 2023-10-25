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
  Patch,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizatedMiddleware } from 'src/middlewares/require-auth.middleware';
import { RoleGuard } from 'src/middlewares/role.guard';
import { GetUser } from 'src/user/user.decorator';
import { Response } from 'express';
import { CertificateResultDto } from './dto/certificate-result.dto';
import { Roles } from '@deanery-common/shared';

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
  ): Promise<CertificateResultDto> {
    const enrolleeId = user.id;
    return this.certificatesService.create(
      createCertificateDto,
      file,
      enrolleeId,
    );
  }

  @Get('ent/:id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  async findOne(
    @Param('id') id: string,
    @GetUser() { id: enrolleeId },
    @Res() res: Response,
  ) {
    const certificate = await this.certificatesService.findOneByIdAndEntrantId(
      id,
      enrolleeId,
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${certificate.filename}`,
    );

    res.send(certificate.data);
  }

  @Get('ent-all')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  async getAllEntrantSertificates(
    @GetUser() { id: entrantId },
  ): Promise<CertificateResultDto[]> {
    return this.certificatesService.findByEntrantId(entrantId);
  }

  @Delete('ent/:id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  async deleteCertificateById(
    @GetUser() { id: enrolleeId },
    @Param('id') id: string,
  ) {
    return this.certificatesService.remove(id, enrolleeId);
  }

  @Patch('ent/:id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard('enrollee'))
  @UseInterceptors(FileInterceptor('certificate'))
  changeCertificate(
    @Body() createCertificateDto: any,
    @UploadedFile() file,
    @GetUser() user,
    @Param('id') certificateId: string,
  ): Promise<CertificateResultDto> {
    const enrolleeId = user.id;
    return this.certificatesService.change(
      createCertificateDto,
      file,
      enrolleeId,
      certificateId,
    );
  }

  @Get('dean')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Dean))
  getAll() {
    return this.certificatesService.getAll();
  }
  @Get('dean/:id')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Dean))
  getCertificatesByEntrartId(@Param('id') entrantId: string) {
    return this.certificatesService.getCertificatesByEntrartId(entrantId);
  }

  @Get('dean/:certId/file')
  @UseGuards(AuthorizatedMiddleware, new RoleGuard(Roles.Dean))
  async getCerificateFile(
    @Param('certId') certId: string,
    @Res() res: Response,
  ) {
    const certificate =
      await this.certificatesService.getCertificateFile(certId);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${certificate.filename}`,
    );

    res.send(certificate.data);
  }
}
