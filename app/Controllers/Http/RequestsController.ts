import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import Product from 'App/Models/Product'
import CreateRequestValidator from 'App/Validators/CreateRequestValidator'
import { v4 as uuid } from 'uuid'

export default class RequestsController {
  public async store({ auth, response, request }: HttpContextContract) {
    const trx = await Database.transaction()
    const payload = await request.validate(CreateRequestValidator)
    try {
      const authenticatedUser = await auth.use('api').authenticate()
      const client = await Client.findByOrFail('user_id', authenticatedUser.id)

      const totalRequestValue = await Promise.all(
        payload.products.map((e) => {
          return Product.findByOrFail('id', e.product_id)
        })
      )

      console.log(totalRequestValue)

      const uid = uuid()
    } catch (error) {
      console.log(error.messages.errors)
      trx.rollback()
      return response.badRequest({ error: 'Could not create request' })
    }
  }
}
