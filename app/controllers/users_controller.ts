import type { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from '#validators/user'
import User from '#models/user'

export default class UsersController {
  async show({ params, response }: HttpContext) {
    const userId = params.id
    const user = await User.findOrFail(userId)
    return response.ok({ data: user })
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)
    const userId = params.id
    await User.query().where({ id: userId }).update(data)
    return response.noContent()
  }

  async destroy({ response, params }: HttpContext) {
    const userId = params.id
    const user = await User.findOrFail(userId)
    await user.delete()
    return response.noContent()
  }
}
