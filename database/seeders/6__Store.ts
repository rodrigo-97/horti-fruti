import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import { UserTypeEnum } from 'App/Enums/UserTypeEnum'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'store@store.com',
      password: '123123123',
      type: UserTypeEnum.STORE,
    })

    await Store.create({
      name: 'STORE',
      logo: faker.image.food(),
      online: true,
      blocked: true,
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

          return Store.create({
            name: faker.name.findName(),
            logo: faker.image.food(),
            online: true,
            userId: user.id,
          })
        })
    )
  }
}
