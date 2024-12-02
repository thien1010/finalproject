import { HttpStatus } from '@nestjs/common';

export class response {
  status: string | number;
  code: number | string;
  message: string;
  content?: any;
  error?: any;
}

class responseCode {
  success(data: any, message = 'success', code?: any) {
    return {
      status: HttpStatus.OK,
      code: code ? code : HttpStatus.OK,
      message: message,
      content: data,
      error: null,
    };
  }

  failed(message = 'failed') {
    return {
      status: HttpStatus.BAD_REQUEST,
      code: HttpStatus.BAD_REQUEST,
      message: message,
      content: null,
      error: 'failed',
    };
  }
}

const ResponseCode = new responseCode();
export default ResponseCode;
