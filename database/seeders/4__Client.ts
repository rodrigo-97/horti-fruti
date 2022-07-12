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
      name: 'CLIENT',
      phone: faker.phone.number('###########'),
      userId: user.id,
    })

    await Promise.all(
      Array(40)
        .fill(1)
        .map(async () => {
          const user = await User.create({
            email: faker.internet.email(),
            password: faker.internet.password(15),
            type: UserTypeEnum.ADMIN,
          })

          return Client.create({
            name: faker.name.findName(),
            userId: user.id,
            phone: faker.phone.number('###############'),
          })
        })
    )
  }
}
