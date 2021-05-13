import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import * as mongoose from 'mongoose'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id
    },
  },
})
export class User {
  id: string
  @Prop({
    type: String,
    required: true,
    unique: true,
    immutable: true,
    trim: true,
    lowercase: true,
  })
  username: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  })
  contacts: User[]
}

export const UserSchema = SchemaFactory.createForClass(User)
