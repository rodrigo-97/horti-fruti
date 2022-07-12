import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserTypeEnum } from 'App/Enums/UserTypeEnum'
import Client from 'App/Models/Client'
import User from 'App/Models/User'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import EditClientValidator from 'App/Validators/EditClientValidator'

export default class ClientsController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator)
    const trx = await Database.transaction()

    try {
      const client = await User.create({
        email: payload.email,
        password: payload.password,
        type: UserTypeEnum.CLIENT,
      })

      Client.create({
        userId: client.id,
        name: payload.name,
        phone: payload.phone,
      })

      trx.commit()
      return response.ok(client)
    } catch (error) {
      error
      trx.rollback()
      return response.unprocessableEntity()
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(EditClientValidator)
    const authenticatedUser = await auth.use('api').authenticate()
    const trx = await Database.transaction()

    try {
      const user = await User.findByOrFail('id', authenticatedUser.id)
      const client = await Client.findByOrFail('user_id', authenticatedUser.id)

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        })
      } else {
        user.merge({
          email: payload.email,
        })
      }

      client.merge({
        name: payload.name,
        phone: payload.phone,
      })

      await user.save()
      await client.save()
      trx.commit()

      return response.noContent()
    } catch (error) {
      error
      trx.rollback()
      return response.badRequest({ error: 'Could not possible to update client data' })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const clients = await Client.query().preload('user').select('*')

      if (clients.length === 0) {
        return response.notFound({ error: `Could not find any client` })
      }

      return response.ok(clients)
    } catch (error) {
      return response.badRequest({ error: 'Could not find clients' })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    const id = await request.param('id', 0)
    try {
      const client = await Client.query().preload('user').select('*').where({ id })

      if (client.length === 0) {
        return response.notFound({ error: `Could not find client with id = ${id}` })
      }

      return response.ok(client)
    } catch (error) {
      return response.badRequest({ error: `Clound not find client with id = ${id}` })
    }
  }

  public async delete({ response, request }: HttpContextContract) {
    const id = await request.param('id', 0)
    try {
      await Client.query().where({ id }).delete()
      return response.noContent()
    } catch (error) {
      return response.badRequest({ error: `Clound not delete client with id = ${id}` })
    }
  }
}
