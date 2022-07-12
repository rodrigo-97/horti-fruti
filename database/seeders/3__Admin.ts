import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserTypeEnum } from 'App/Enums/UserTypeEnum'
import Admin from 'App/Models/Admin'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'admin@admin.com',
      password: '123123123',
      type: UserTypeEnum.ADMIN,
    })

    await Admin.create({
      name: 'ADMIN',
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

          return Admin.create({
            name: faker.name.findName(),
            userId: user.id,
          })
        })
    )
  }
}
