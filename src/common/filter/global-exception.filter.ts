import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseEntity } from '../dto/response-entity.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, response);
    }

    return this.handleUnknownException(exception, response);
  }

  private handleHttpException(exception: HttpException, response: Response) {
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const message =
      typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message || 'Unexpected error occurred';

    return response.status(status).json(this.createFailureResponse(message));
  }

  private handleUnknownException(exception: unknown, response: Response) {
    console.error('Unhandled Exception:', exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.createFailureResponse('Internal Server Error'));
  }

  private createFailureResponse(message: string) {
    return ResponseEntity.failure(message, new Date());
  }
}
