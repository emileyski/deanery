import { Injectable } from '@nestjs/common';
import { CreateEntrantDto } from './dto/create-entrant.dto';
import { UpdateEntrantDto } from './dto/update-entrant.dto';
import { EntrantsRepository } from './entrants.repository';

@Injectable()
export class EntrantsService {
  constructor(private entrantsRepo: EntrantsRepository) {}

  create(createEntrantDto: CreateEntrantDto) {
    return 'This action adds a new entrant';
  }

  findAll() {
    return `This action returns all entrants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entrant`;
  }

  update(id: number, updateEntrantDto: UpdateEntrantDto) {
    return `This action updates a #${id} entrant`;
  }

  remove(id: number) {
    return `This action removes a #${id} entrant`;
  }
}
