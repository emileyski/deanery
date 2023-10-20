import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrantsService } from './entrants.service';
import { CreateEntrantDto } from './dto/create-entrant.dto';
import { UpdateEntrantDto } from './dto/update-entrant.dto';

@Controller('entrants')
export class EntrantsController {
  constructor(private readonly entrantsService: EntrantsService) {}

  @Post()
  create(@Body() createEntrantDto: CreateEntrantDto) {
    return this.entrantsService.create(createEntrantDto);
  }

  @Get()
  findAll() {
    return this.entrantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entrantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntrantDto: UpdateEntrantDto) {
    return this.entrantsService.update(+id, updateEntrantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entrantsService.remove(+id);
  }
}
