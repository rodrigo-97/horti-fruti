import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: faker.internet.email(),
      password: '123123123',
      type: 'admin',
    })

    await Admin.create({
      name: faker.name.findName(),
      userId: user.id,
    })
  }
}
