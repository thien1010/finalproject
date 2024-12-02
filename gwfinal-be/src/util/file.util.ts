import * as fs from 'fs';
import path from 'path';

export class HandleFile {
  singleBase64(file: any) {
    if (file) {
      const bitmap = fs.readFileSync(file.path);
      fs.unlinkSync(file.path);
      return `data:${file.mimetype};base64,${Buffer.from(bitmap).toString(
        'base64',
      )}`;
    }
  }

  multipleBase64(arrFile: any) {
    return arrFile.map((file: any) => {
      if (file) {
        const bitmap = fs.readFileSync(file.path);
        fs.unlinkSync(file.path);
        return `data:${file.mimetype};base64,${Buffer.from(bitmap).toString(
          'base64',
        )}`;
      }
    });
  }

  DeleteFiles(arrFile: any) {
    console.log(arrFile);
    try {
      for (const file of arrFile) {
        fs.unlinkSync(file);
      }
    } catch (err) {
      console.error('Error delete file:', err.message);
    }
  }

  deleteAllFile() {
    const fullPath = path.join(process.cwd() + '/uploads/img');
    const files = fs.readdirSync(fullPath);

    try {
      files.forEach(async (file) =>
        fs.unlink(process.cwd() + '/uploads/img/' + file, (err) => {
          if (err) {
            throw err;
          }
          console.log('Delete File successfully.');
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
