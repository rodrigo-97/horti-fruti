import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string | null

  @column()
  public position: number

  @column()
  public price: number

  @column()
  public unity: number

  @column()
  public image: string | null

  @column()
  public categoryId: number

  @column.dateTime()
  public deletedAt: DateTime

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Category, { foreignKey: 'id', localKey: 'categoryId' })
  public category: HasOne<typeof Category>
}
