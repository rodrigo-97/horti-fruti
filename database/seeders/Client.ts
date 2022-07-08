import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import { UserTypeEnum } from 'App/Enums/UserTypeEnum'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'client@client.com',
      password: '123123123',
      type: UserTypeEnum.CLIENT,
    })

    await Client.create({
      name: faker.name.findName(),
      phone: faker.phone.number('###########'),
      userId: user.id,
    })

    Array(40)
      .fill(1)
      .forEach(async () => {
        const user = await User.create({
          email: faker.internet.email(),
          password: faker.internet.password(15),
          type: UserTypeEnum.ADMIN,
        })

        await Client.create({
          name: faker.name.findName(),
          userId: user.id,
        })
      })
  }
}
