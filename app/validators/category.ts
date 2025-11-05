import vine from '@vinejs/vine'

export const addCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
