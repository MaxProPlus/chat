import {BadRequestException, Injectable} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {InjectModel} from '@nestjs/mongoose'
import {User, UserDocument} from './schemas/user.schema'
import {Model} from 'mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private catModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const checkExistUser = await this.findByUsername(createUserDto.username)
    if (checkExistUser) {
      throw new BadRequestException('username занят')
    }
    const createdUser = new this.catModel(createUserDto)
    await createdUser.save()
  }

  async findByUsername(username: string) {
    return this.catModel.findOne({username: username})
  }
}
