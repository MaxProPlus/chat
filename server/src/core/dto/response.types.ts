import {Schema} from '@nestjs/mongoose'

@Schema()
export class ResponseDto<T> {
  statusCode: number
  results: T
}
