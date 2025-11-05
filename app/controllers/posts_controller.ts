import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { addPostValidator, updatePostValidator } from '#validators/post'
import Tag from '#models/tag'
import { FileUploadService } from '#services/file_upload_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PostsController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  async index({ response, request }: HttpContext) {
    const page = request.param('page') || 1
    const posts = await Post.query().preload('category').paginate(page, 20)
    return response.ok(posts)
  }

  async show({ response, params }: HttpContext) {
    const postId = params.id
    const post = await Post.query()
      .preload('category')
      .preload('tags')
      .where({ id: postId })
      .firstOrFail()
    return response.ok({ data: post })
  }

  async store({ response, request, auth }: HttpContext) {
    const data = await request.validateUsing(addPostValidator)
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: "Vous n'etes pas authorise" })
    }

    const file = await this.fileUploadService.upload('posts', data.imageUrl)

    const post = await Post.create({
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      authorId: user.id,
      imageUrl: file,
    })

    for (let tag of data.tags) {
      const newTag = await Tag.create({ name: tag })
      newTag.related('posts').attach([post.id])
    }
    return response.noContent()
  }

  async update({ response, request, params }: HttpContext) {
    const data = await request.validateUsing(updatePostValidator)
    const postId = params.id

    if (data.imageUrl) {
      const file = await this.fileUploadService.upload('posts', data.imageUrl)
      const newData = {
        ...data,
        imageUrl: file,
      }
      await Post.query().where({ id: postId }).update(newData)
      return response.noContent()
    }

    await Post.query().where({ id: postId }).update(data)
    return response.noContent()
  }

  async destroy({ response, params }: HttpContext) {
    const postId = params.id
    const post = await Post.findOrFail(postId)
    await post.delete()
    return response.noContent()
  }
}
