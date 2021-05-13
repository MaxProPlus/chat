import {BadRequestException, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {UserDocument} from '../user/schemas/user.schema'

@Injectable()
export class ContactService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Добавить контакт
  async add(id: string, username: string) {
    const me = await this.userModel.findById(id)
    const contact = await this.userModel.findOne({username: username})
    if (!contact) {
      throw new BadRequestException('Пользователь не найден')
    }
    if (!me.contacts.find((el) => el.toString() === contact.id)) {
      me.contacts.push(contact.id)
    }
    return me.save()
  }

  // Список контактов
  async findAll(id: string) {
    const me = await this.userModel
      .findById(id)
      .populate('contacts', 'username')
    return me.contacts
  }

  // Удалить контакт
  async remove(myId: string, id: string) {
    const me = await this.userModel.findById(myId)
    await me.updateOne({$pull: {contacts: id}})
  }
}
