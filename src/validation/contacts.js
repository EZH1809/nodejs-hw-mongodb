import Joi from 'joi';
import {
  contactTypeList,
  contactFieldPhone,
} from '../constants/contacts-const.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.string().pattern(contactFieldPhone).required().messages({
    'string.base': 'Phone number should be a string',
    'string.pattern.base':
      'Phone number can only contain numbers and characters +, -, (, ), and spaces',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': `Contact type must be one of the following: ${contactTypeList.join(
        ', ',
      )}`,
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().pattern(contactFieldPhone).messages({
    'string.base': 'Phone number should be a string',
    'string.pattern.base':
      'Phone number can only contain numbers and characters +, -, (, ), and spaces',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email address',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean value',
  }),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': `Contact type must be one of the following: ${contactTypeList.join(
        ', ',
      )}`,
    }),
}).min(1);
