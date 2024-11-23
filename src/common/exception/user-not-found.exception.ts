import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  errorCode: string;
  constructor(message: string, errorCode: string = 'USER_NOT_FOUND') {
    super(message);
    this.errorCode = errorCode;
  }
}
