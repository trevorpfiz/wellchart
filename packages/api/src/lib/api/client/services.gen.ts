// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import type {
  HealthCheckResponse,
  UploadZipData,
  UploadZipResponse,
} from "./types.gen";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";

export class HealthService {
  /**
   * Check
   * Secured health check endpoint.
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static healthCheck(): CancelablePromise<HealthCheckResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/health",
      errors: {
        404: "Not found",
      },
    });
  }
}

export class UploadService {
  /**
   * Zip
   * Secure endpoint to upload and process zip files, ensuring valid JWTs.
   * @param data The data for the request.
   * @param data.formData
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static uploadZip(
    data: UploadZipData,
  ): CancelablePromise<UploadZipResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/upload",
      // @ts-ignore
      formData: data.formData,
      mediaType: "multipart/form-data",
      errors: {
        404: "Not found",
        422: "Validation Error",
      },
    });
  }
}
