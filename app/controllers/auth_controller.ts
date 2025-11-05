import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await User.create({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    })
    return response.noContent()
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)
    const data = await User.accessTokens.create(user)
    return response.ok({
      data: data,
    })
  }
}
