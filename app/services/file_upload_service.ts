import { cuid } from '@adonisjs/core/helpers'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { inject } from '@adonisjs/core'

@inject()
export class FileUploadService {
  async upload(path: string, file: MultipartFile) {
    const uuid = cuid()
    const fileName = `${uuid}.png`

    file.move(`uploads/${path}/`, {
      name: fileName,
      overwrite: false,
    })

    return fileName
  }
}
