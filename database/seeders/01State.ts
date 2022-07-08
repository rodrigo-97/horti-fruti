import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import State from 'App/Models/State'

export default class extends BaseSeeder {
  public async run() {
    await State.create({
      name: faker.address.state(),
      uf: faker.address.stateAbbr(),
    })
  }
}
