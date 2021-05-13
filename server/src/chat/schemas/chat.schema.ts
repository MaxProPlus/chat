import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import {Document} from 'mongoose'
import {MessageDocument} from 'src/message/schemas/message.schema'
import {UserDocument} from '../../user/schemas/user.schema'

export type ChatDocument = Chat & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id
      ret.title = doc.title
      ret.to = doc.to
    },
  },
})
export class Chat {
  @Prop({
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    required: true,
  })
  users: mongoose.Schema.Types.ObjectId[] | UserDocument[]

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  })
  lastMessage: mongoose.Schema.Types.ObjectId | MessageDocument

  title: string
  to?: string
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
