import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    email: vine.string().email().trim().optional(),
    password: vine.string().trim().optional(),
    passwordConfirmation: vine.string().trim().sameAs('password').optional(),
  })
)
