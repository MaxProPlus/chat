import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common'
import {CreateUserDto} from '../dto/create-user.dto'

export class UserValidator
  implements PipeTransform<CreateUserDto, CreateUserDto> {
  transform(value: any, _metadata: ArgumentMetadata): CreateUserDto {
    const errors = []

    if (typeof value.username !== 'string') {
      errors.push('the username should be a string')
    } else {
      if (!/^[A-Za-z0-9_-]{3,16}$/.test(value.username)) {
        errors.push(
          'Длина логина должна быть от 3 до 16 знаков и должен состоять из цифр, латинских букв, символов - и _.'
        )
      }
    }
    if (value.password !== value.repeatPassword) {
      errors.push('Пароли не совпадают')
    }
    if (typeof value.password !== 'string') {
      errors.push('the password should be a string')
    } else {
      if (!/^[A-Za-z0-9_-]{3,16}$/.test(value.password)) {
        errors.push(
          'Длина пароля должна быть от 3 до 16 знаков и должен состоять из цифр, прописных и строчных букв, символов - и _.'
        )
      }
    }
    if (errors.length) {
      throw new BadRequestException(errors, 'Ошибка валидации')
    }
    const user = new CreateUserDto()
    user.username = value.username
    user.password = value.password
    return user
  }
}
