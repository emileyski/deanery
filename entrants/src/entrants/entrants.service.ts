import { Injectable } from '@nestjs/common';
import { CreateEntrantDto } from './dto/create-entrant.dto';
import { UpdateEntrantDto } from './dto/update-entrant.dto';
import { EntrantsRepository } from './entrants.repository';

@Injectable()
export class EntrantsService {
  constructor(private entrantsRepo: EntrantsRepository) {}

  async findById(entrantId: string) {
    const entrant = await this.entrantsRepo
      .createQueryBuilder('entrant')
      .leftJoinAndSelect('entrant.certificates', 'certificates')
      .select([
        'entrant.firstName',
        'entrant.lastName',
        'entrant.id',
        'certificates.id',
        'certificates.certificateType',
        'certificates.grade',
      ])
      .where('entrant.id = :id', { id: entrantId })
      .getOne();

    return entrant;
  }

  findAll() {
    return `This action returns all entrants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entrant`;
  }
}
