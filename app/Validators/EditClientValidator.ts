import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user?.id,
  })

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ column: 'email', table: 'users' }),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.user_id } }),
    ]),
    password: schema.string.nullableAndOptional({}, [
      rules.minLength(8),
      rules.confirmed('confirmPassword'),
    ]),
    confirmPassword: schema.string({}),
    phone: schema.string({ trim: true }, [rules.maxLength(15)]),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{ field }} é obrigatório',
    'email.email': 'O {{ field }} passado está inválido',
    'email.unique': 'O {{ field }} passado já está em uso',
    'password.minLength': 'A senha deve possuir 8 ou mais caracters',
    'confirmPassword.confirmed': 'A confirmação de senha não confere com a senha passada',
    'phone.mobile': 'O telefone não está no formato brasileiro',
    'phone.maxLength': 'O telefone precisa conter pelo menos 15 caracteres',
  }
}
