export interface HttpErrorResponse {
  error: {
    result_type?: string;
    error_code: string;
    message?: any;
    error_date?: string;
  };
}

export type HttpSuccessResponse<T> = T;

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;
