import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RequestStatus from 'App/Models/RequestStatus'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return RequestStatus.create({
            comments: faker.lorem.sentence(),
            statusId: faker.datatype.number({ min: 1, max: 4 }),
            requestId: faker.datatype.number({ min: 1, max: 40 }),
          })
        })
    )
  }
}
