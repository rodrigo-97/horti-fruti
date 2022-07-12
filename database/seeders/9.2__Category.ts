import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return Category.create({
            description: faker.lorem.sentence(),
            name: faker.name.jobType(),
            position: faker.datatype.number(1000),
            storeId: faker.datatype.number({ min: 1, max: 40 }),
          })
        })
    )
  }
}
