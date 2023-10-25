import { Injectable } from '@nestjs/common';
import { EntrantsRepository } from './entrants.repository';

@Injectable()
export class EntrantsService {
  constructor(private entrantsRepo: EntrantsRepository) {}

  async findAll() {
    return this.entrantsRepo.find();
  }

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
}
