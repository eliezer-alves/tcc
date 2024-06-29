import { HttpStatus, HttpException } from '@nestjs/common';
import { apiResponse } from './api-response';

const exception = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

export const UNAUTHORIZED = apiResponse(exception);
