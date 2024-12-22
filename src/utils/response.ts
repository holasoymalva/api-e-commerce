export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: string[];
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ResponseUtil {
  static success<T>(
    data: T,
    message?: string,
    metadata?: ApiResponse<T>["metadata"]
  ): ApiResponse<T> {
    return {
      status: "success",
      message,
      data,
      metadata,
    };
  }

  static error(message: string, errors?: string[]): ApiResponse<null> {
    return {
      status: "error",
      message,
      errors,
    };
  }

  // Helper method for paginated responses
  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ): ApiResponse<T[]> {
    return {
      status: "success",
      data,
      metadata: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Helper method for empty success responses
  static empty(message = "Operation successful"): ApiResponse<null> {
    return {
      status: "success",
      message,
    };
  }

  // Helper method for created responses
  static created<T>(
    data: T,
    message = "Resource created successfully"
  ): ApiResponse<T> {
    return {
      status: "success",
      message,
      data,
    };
  }

  // Helper method for updated responses
  static updated<T>(
    data: T,
    message = "Resource updated successfully"
  ): ApiResponse<T> {
    return {
      status: "success",
      message,
      data,
    };
  }

  // Helper method for deleted responses
  static deleted(message = "Resource deleted successfully"): ApiResponse<null> {
    return {
      status: "success",
      message,
    };
  }
}

// Utility function for handling async routes
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error types
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}
