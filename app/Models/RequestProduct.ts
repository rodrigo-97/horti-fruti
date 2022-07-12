import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Product from './Product'

export default class RequestProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public requestId: number

  @column()
  public productId: number

  @column()
  public qtd: number

  @column()
  public value: number

  @column()
  public comments: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Product, { foreignKey: 'id', localKey: 'productId' })
  public product: HasOne<typeof Product>

  @hasOne(() => Product, { foreignKey: 'id', localKey: 'requestId' })
  public request: HasOne<typeof Product>
}
