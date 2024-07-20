
import { model, Schema } from 'mongoose';
import {
  contactTypeList,
  contactFieldEmail,
} from '../../constants/contacts-const.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be provided'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number must be provided'],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return contactFieldEmail.test(v);
        },
        message: 'Email validation failed',
      },
      required: [false, 'Email required'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: {
        values: contactTypeList,
        message: '{VALUE} is missing',
      },
      required: true,
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
