enum ErrorMessages {
  InternalError = 'Internal serverside error.',
  InvalidJsonFormat = 'Invalid JSON format.',
  InvalidMethod = 'Method Not Allowed.',
  InvalidUserId = 'Invalid userId format.',
  NotFoundError = 'Not Found.',
  NoUserId = 'Missing userId. Please specify userId.',
  UserNotFound = 'User not found.',
}

enum RequestMethods {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export { ErrorMessages, RequestMethods };
