import { Module } from '@nestjs/common';
import { EntrantsService } from './entrants.service';
import { EntrantsController } from './entrants.controller';
import { EntrantsRepository } from './entrants.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([Entrant])], // Добавьте Entrant в forFeature
  controllers: [EntrantsController],
  providers: [EntrantsService, EntrantsRepository],
  exports: [EntrantsRepository],
})
export class EntrantsModule {}
