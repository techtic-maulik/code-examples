import { BadRequestException, Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import * as express from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException> {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as express.Response;
    response.status(422).json({
      statusCode: 422,
      error: `Unprocessable Entity`,
      message: exception.message.message,
    });
  }
}
