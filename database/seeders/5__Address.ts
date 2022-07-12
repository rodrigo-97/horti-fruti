import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return Address.create({
            cityId: faker.datatype.number({ min: 1, max: 40 }),
            clientId: faker.datatype.number({ min: 1, max: 40 }),
            complement: faker.address.secondaryAddress(),
            number: faker.address.buildingNumber(),
            neighborhood: faker.lorem.word(),
            street: faker.address.street(),
            referencePoint: faker.lorem.lines(1),
          })
        })
    )
  }
}
