import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const MulterOptions = {
  storage: diskStorage({
    destination: './uploads/img',
    // eslint-disable-next-line prettier/prettier
    filename: (req: any, file: any, callback: any) => {
      callback(null, generateFilename(file));
    },
  }),
};
export const VideoMulterOptions = {
  storage: diskStorage({
    destination: './uploads/videos',
    filename: (req: any, file: any, callback: any) => {
      callback(null, generateVideoFilename(file));
    },
  }),
};

function generateFilename(file: { originalname: string }) {
  return `${uuidv4()}.${extname(file.originalname)}`;
}
function generateVideoFilename(file: { originalname: string }) {
  return `${uuidv4()}.${extname(file.originalname)}`;
}
