import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Store from './Store'

export default class CitiesStore extends BaseModel {
  @column({ isPrimary: true })
  public cityId: number

  @column({ isPrimary: true })
  public storeId: number

  @column()
  public deliveryFee: number

  @hasOne(() => Store, { foreignKey: 'id', localKey: 'storeId' })
  public store: HasOne<typeof Store>

  @hasOne(() => City, { foreignKey: 'id', localKey: 'cityId' })
  public city: HasOne<typeof City>
}
