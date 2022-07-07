import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: faker.internet.email(),
      password: '123123123',
      type: 'client',
    })

    await Client.create({
      name: faker.name.findName(),
      phone: faker.phone.number('###########'),
      userId: user.id,
    })
  }
}
