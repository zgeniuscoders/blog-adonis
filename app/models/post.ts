import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Category from '#models/category'
import * as relations from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Tag from '#models/tag'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare authorId: number

  @column()
  declare categoryId: number

  @column()
  declare title: string

  @column()
  declare imageUrl: string

  @column()
  declare content: string

  @belongsTo(() => Category)
  declare category: relations.BelongsTo<typeof Category>

  @belongsTo(() => User, { foreignKey: 'authorId' })
  declare author: relations.BelongsTo<typeof User>

  @manyToMany(() => Tag, { pivotTable: 'post_tag' })
  declare tags: relations.ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
