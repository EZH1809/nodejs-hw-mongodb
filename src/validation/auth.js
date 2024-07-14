// src/validation/auth.js
import Joi from 'joi';
import { contactFieldEmail } from '../constants/contacts-const.js';
//валидация при регистрации
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(contactFieldEmail).required(),
  password: Joi.string().min(6).required(),
});
//валидация при логине
export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(contactFieldEmail).required(),
  password: Joi.string().min(6).required(),
});
