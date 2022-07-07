import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: faker.internet.email(),
      password: '123123123',
      type: 'store',
    })

    await Store.create({
      name: faker.name.findName(),
      logo: faker.image.food(),
      online: true,
      blocked: true,
      userId: user.id,
    })
  }
}
