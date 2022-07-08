import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Status from './Status'

export default class RequestStatus extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public requestId: number

  @column({ isPrimary: true })
  public statusId: number

  @column()
  public comments: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Status, { foreignKey: 'id', localKey: 'statusId' })
  public status: HasOne<typeof Status>
}
