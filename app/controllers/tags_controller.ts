import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'

export default class TagsController {
  async index({ response, request }: HttpContext) {
    const page = request.param('page') || 1
    const tags = await Tag.query().paginate(page, 10)
    return response.ok(tags)
  }

  async show({ response, params }: HttpContext) {
    const tagId = params.id
    const tag = await Tag.query()
      .preload('posts', (query) => {
        query.preload('category')
      })
      .where({ id: tagId })
      .firstOrFail()
    return response.ok({ data: tag })
  }
}
