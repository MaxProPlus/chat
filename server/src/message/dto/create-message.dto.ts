import {ApiProperty} from '@nestjs/swagger'

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message id chat',
  })
  chat: string

  @ApiProperty({
    description: 'Message id from',
  })
  from: string

  @ApiProperty({
    description: 'Message id to',
  })
  to: string

  @ApiProperty({
    description: 'Message body',
  })
  body: string
}
