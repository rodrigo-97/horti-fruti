import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserType } from '@Types/UserType'
import { UserTypeEnum } from 'App/Enums/UserType'
import Admin from 'App/Models/Admin'
import Client from 'App/Models/Client'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, response, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findByOrFail('email', email)
      const expiresIn = '7days'

      const token = await auth.use('api').attempt(email, password, {
        expiresIn,
        name: user.serialize().email,
      })

      response.ok(token)
    } catch (error) {
      return response.badRequest({ error: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.ok({
        revoked: true,
      })
    } catch (error) {
      return response.unauthorized('You are not authorized')
    }
  }

  public async me({ response, auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    const data: UserType = {}

    console.log(user.type)

    try {
      if (user.type === UserTypeEnum.admin) {
        const admin = await Admin.findByOrFail('userId', user.id)
        data.admin = admin
      }

      if (user.type === UserTypeEnum.store) {
        const store = await Store.findByOrFail('userId', user.id)
        console.log(store)
        data.store = store
      }

      if (user.type === UserTypeEnum.client) {
        const client = await Client.findByOrFail('userId', user.id)
        data.client = client
      }

      return response.ok(data)
    } catch (error) {
      console.error(error)
      return response.notFound({ error: 'User not found' })
    }
  }
}
