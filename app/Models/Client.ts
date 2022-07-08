import { DateTime } from 'luxon'

import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Address from './Address'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public phone: string

  @hasOne(() => User, { foreignKey: 'id', localKey: 'userId' })
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Address, { foreignKey: 'clientId', localKey: 'id' })
  public addresses: HasMany<typeof Address>
}
