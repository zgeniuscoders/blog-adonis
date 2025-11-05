import vine from '@vinejs/vine'

export const addPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    content: vine.string().trim().minLength(100),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }),
    imageUrl: vine.file({
      extnames: ['jpg', 'png', 'jpeg'],
      size: '5mb',
    }),
    tags: vine.array(vine.string().trim()),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).optional(),
    content: vine.string().trim().minLength(100).optional(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }).optional(),
    imageUrl: vine
      .file({
        extnames: ['jpg', 'png', 'jpeg'],
        size: '5mb',
      })
      .optional(),
    tags: vine.array(vine.string().trim()).optional(),
  })
)
