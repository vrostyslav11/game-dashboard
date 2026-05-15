import { isAxiosError } from 'axios';

/** NestJS default error body shape. */
interface NestErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<NestErrorBody>(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) {
      return message.join('. ');
    }
    if (typeof message === 'string') {
      return message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
}

export function isUnauthorizedError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 401;
}
