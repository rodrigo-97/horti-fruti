import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import City from './City'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string

  @column()
  public number: string | null

  @column()
  public neighborhood: string

  @column()
  public referencePoint: string | null

  @column()
  public complement: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deletedAt: DateTime | null

  @column()
  public clientId: number

  @column()
  public cityId: number

  @hasOne(() => City, { foreignKey: 'id', localKey: 'cityId' })
  public city: HasOne<typeof City>
}
