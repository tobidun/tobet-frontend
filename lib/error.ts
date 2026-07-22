// lib/error.ts
// Global error handling utilities.

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;
  if (error && typeof error === 'object' && 'code' in error) {
    const apiError = error as { code: string; message: string };
    return new AppError(apiError.message, apiError.code);
  }
  return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR');
};
