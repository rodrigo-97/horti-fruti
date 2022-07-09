import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import City from 'App/Models/City'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return City.create({
            name: faker.address.state(),
            active: true,
            stateId: faker.datatype.number({ min: 1, max: 40 }),
          })
        })
    )
  }
}
