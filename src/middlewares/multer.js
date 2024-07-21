import multer from 'multer';
import createHttpError from 'http-errors';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

// Ограничение размера файла и фильтрация типов файлов
const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return cb(createHttpError(400, '.exe files are not allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
