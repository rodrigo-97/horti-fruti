import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Request from 'App/Models/Request'
import Store from 'App/Models/Store'

export default class StoresController {
  public async requests({ response, auth }: HttpContextContract) {
    const authenticatedUser = await auth.use('api').authenticate()

    try {
      const store = await Store.findByOrFail('user_id', authenticatedUser.id)
      const requests = await Request.query()
        .where({ storeId: store.id })
        .preload('client')
        .preload('requestStatus')

      return response.ok(requests)
    } catch (error) {
      error
      return response.badRequest({
        error: 'Could not find any request from the authenticated user',
      })
    }
  }
}
