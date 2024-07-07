import { model, Schema } from 'mongoose';
import {
  contactTypeList,
  contactFieldEmail,
} from '../../constants/contacts-const.js';
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Title mast be'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number mast be'],
    },
    email: {
      type: String,
      validate: {
        validator: async function (v) {
          return new Promise((resolve, reject) => {
            if (contactFieldEmail.test(v)) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
