import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'
import { DateTime } from 'luxon'

export default class AddressesController {
  public async store({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateAddressValidator)
    try {
      const authenticatedUser = await auth.use('api').authenticate()
      const client = await Client.findByOrFail('user_id', authenticatedUser.id)

      const address = await Address.create({
        clientId: client.id,
        ...payload,
      })
      return response.ok(address)
    } catch (error) {
      error
      return response.badRequest({ error: 'Could not create Address' })
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const payload = await request.validate(CreateAddressValidator)
    try {
      const address = await Address.findOrFail(params.id)
      address.merge(payload)

      await address.save()

      return response.ok(address)
    } catch (error) {
      error
      return response.badRequest({ error: 'Could not update Address' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const address = await Address.findOrFail(params.id)
      address.merge({
        deletedAt: DateTime.now(),
      })

      await address.save()
      return response.noContent()
    } catch (error) {
      error
      return response.badRequest({ error: `Could not delete address with id ${params.id}` })
    }
  }

  public async index({ response, auth }: HttpContextContract) {
    const authenticatedUser = await auth.use('api').authenticate()
    try {
      const client = await Client.query()
        .where({ user_id: authenticatedUser.id })
        .preload('addresses', (q) => {
          q.andWhere({ deletedAt: null })
            .orderBy('id', 'asc')
            .preload('city', (q) => {
              q.preload('state')
            })
        })
        .firstOrFail()

      if (client.addresses.length === 0) {
        return response.badRequest({
          error: `Could not find any address for user ${client.name}`,
        })
      }

      return response.ok(client.addresses)
    } catch (error) {
      error
      return response.badRequest({
        error: `Could not find any address for user with e-mail ${authenticatedUser.email}`,
      })
    }
  }
}
