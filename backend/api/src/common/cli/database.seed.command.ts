import { Injectable } from '@nestjs/common';
import { SeederService } from '../database/seeder/seeder.service';
import { Command, Console, createSpinner } from 'nestjs-console';

@Console()
export class DatabaseSeedCommand {
  constructor(private seederService: SeederService) {
  }

  @Command({
    command: 'database:seed <count>',
    description: 'seeding mock data',
  })
  databaseSeed(count: number) {
    const spin = createSpinner();
    spin.start(`Start seeding database`);

    try {
      this.seederService.seed().then(() => {
        spin.succeed('Seeding done');
      })
    } catch (e) {
      console.log(e);
    }
  }

  @Command({
    command: 'database:seed <entity> <count>',
    description: 'seeding mock data',
  })
  databaseSeedEntity(entity: string, count: number) {
    const spin = createSpinner();
    spin.start(`Start seeding ${entity}`);

    try {
      this.seederService.seed(entity, count).then(() => {
        spin.succeed('Seeding done');
      })
    } catch (e) {
      console.log(e);
    }
  }
}
