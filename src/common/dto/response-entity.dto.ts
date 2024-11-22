export class SuccessResponseEntity<T> {
  message: string;
  data: T;
  constructor({ message, data }: { message: string; data: T }) {
    this.message = message;
    this.data = data;
  }
}

export class FailureResponseEntity<T> {
  message: string;
  timestamp: Date;
  constructor({ message, timestamp }: { message: string; timestamp: Date }) {
    this.message = message;
    this.timestamp = timestamp;
  }
}

export class ResponseEntity<T> {
  static success(data, message) {
    return new SuccessResponseEntity({ message, data });
  }

  static failure(message, timestamp) {
    return new FailureResponseEntity({ message, timestamp });
  }
}
