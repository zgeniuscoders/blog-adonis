import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { addCategoryValidator } from '#validators/category'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await Category.all()
    return response.ok({ data: categories })
  }

  async show({ response, params }: HttpContext) {
    const categoryId = params.id
    const category = await Category.findOrFail(categoryId)
    return response.ok({ data: category })
  }

  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(addCategoryValidator)
    await Category.create(data)
    return response.noContent()
  }

  async update({ response, request, params }: HttpContext) {
    const data = await request.validateUsing(addCategoryValidator)
    const categoryId = params.id
    await Category.query().where({ id: categoryId }).update(data)
    return response.noContent()
  }

  async destroy({ response, params }: HttpContext) {
    const categoryId = params.id
    const category = await Category.findOrFail(categoryId)
    await category.delete()
    return response.noContent()
  }
}
