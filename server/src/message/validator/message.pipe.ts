import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import {CreateMessageDto} from '../dto/create-message.dto'

export class MessageValidator implements PipeTransform {
  transform(
    value: CreateMessageDto,
    _metadata: ArgumentMetadata
  ): CreateMessageDto {
    const errors = []
    if (typeof value.body !== 'string') {
      errors.push('Тело сообщения должно быть string')
    } else {
      value.body = value.body.trim().replace(/\s{2,}/g, ' ')
      if (value.body.length < 1 || value.body.length > 255) {
        errors.push('Длина сообщения должна составлять от 1 до 255 символов')
      }
    }

    if (errors.length) {
      throw new BadRequestException(errors, 'Ошибка валидации')
    }
    const message = new CreateMessageDto()
    message.body = value.body
    return message
  }
}
