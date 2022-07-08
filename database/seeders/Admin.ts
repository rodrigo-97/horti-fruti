import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import { UserTypeEnum } from 'App/Enums/UserTypeEnum'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'admin@admin.com',
      password: '123123123',
      type: UserTypeEnum.ADMIN,
    })

    await Admin.create({
      name: faker.name.findName(),
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

        await Admin.create({
          name: faker.name.findName(),
          userId: user.id,
        })
      })
  }
}
