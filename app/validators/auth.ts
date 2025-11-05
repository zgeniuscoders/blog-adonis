import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    fullName: vine.string().trim().minLength(3),
    password: vine.string().trim().minLength(6),
    confirmPassword: vine.string().trim().minLength(6).sameAs('password'),
  })
)
