import { HttpStatus, HttpException } from '@nestjs/common';
import { apiResponse } from './api-response';

const exception = new HttpException(
  'Internal Server Error',
  HttpStatus.INTERNAL_SERVER_ERROR,
);

export const INTERNAL_SERVER_ERROR = apiResponse(exception);
