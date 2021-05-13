import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Username user',
  })
  username: string

  @ApiProperty({
    description: 'Password user',
  })
  password: string

  @ApiProperty({
    description: 'Repeat password user',
  })
  repeatPassword: string
}
