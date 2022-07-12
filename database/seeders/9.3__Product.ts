import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      Array(40)
        .fill(1)
        .map(() => {
          return Product.create({
            categoryId: faker.datatype.number({ min: 1, max: 40 }),
            description: faker.lorem.sentence(),
            image: faker.image.food(),
            name: faker.commerce.product.name,
            price: faker.commerce.price(50, 200),
            unity: faker.datatype.number({ min: 1, max: 3 }),
          })
        })
    )
  }
}
