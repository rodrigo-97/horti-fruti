import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Request from 'App/Models/Request'
import { v4 as uuid } from 'uuid'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return Request.create({
            addressId: faker.datatype.number({ min: 1, max: 40 }),
            changeMoney: faker.datatype.number({ min: 100, max: 1000.0 }),
            clientId: faker.datatype.number({ min: 1, max: 40 }),
            comments: faker.lorem.sentence(),
            deliveryFee: faker.datatype.number({ min: 0, max: 10.0 }),
            uid: uuid(),
            storeId: faker.datatype.number({ min: 1, max: 40 }),
            paymentMethodId: faker.datatype.number({ min: 1, max: 4 }),
            value: faker.datatype.number({ min: 32.87, max: 220.65 }),
          })
        })
    )
  }
}
