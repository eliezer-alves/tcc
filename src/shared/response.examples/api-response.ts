import { HttpException } from '@nestjs/common';

export const apiResponse = (exception: HttpException) => ({
  status: exception.getStatus(),
  description: exception.message,
  schema: {
    example: {
      statusCode: exception.getStatus(),
      message: exception.message,
    },
  },
});
