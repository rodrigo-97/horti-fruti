import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    active: schema.boolean(),
    state_id: schema.number([rules.unsigned()]),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{ field }} é obrigatório',
    'state_id.unsigned': 'O campo {{ field }} precisa ser do tipo inteiro positivo',
  }
}
