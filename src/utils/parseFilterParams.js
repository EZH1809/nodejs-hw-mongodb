import { contactTypeList } from '../constants/contacts-const.js';

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  return contactTypeList.includes(contactType) ? contactType : null;
};

const parseContactIsFavourite = (isFavourite) => {
  if (!['true', 'false'].includes(isFavourite)) return;
  return isFavourite === 'true';
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedContactIsFavourite = parseContactIsFavourite(isFavourite);

  return {
    isFavourite: parsedContactIsFavourite,
    contactType: parsedContactType,
  };
};
