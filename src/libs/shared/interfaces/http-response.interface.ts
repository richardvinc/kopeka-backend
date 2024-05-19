export interface HttpErrorResponse {
  ok: false;
  error: {
    result_type?: string;
    error_code: string;
    message?: any;
    error_date?: string;
    http_status_code?: number;
  };
}

export type HttpSuccessResponse<T> = {
  ok: true;
} & T;

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;
