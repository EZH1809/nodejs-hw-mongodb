export const contactTypeList = ['work', 'home', 'personal'];
export const contactFieldList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];
export const contactFieldPhone = /^[0-9()+-\s]+$/;
export const contactFieldEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
