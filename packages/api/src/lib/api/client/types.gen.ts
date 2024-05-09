// This file is auto-generated by @hey-api/openapi-ts

export type Body_upload_upload_zip = {
    file: (Blob | File);
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type HealthHealthCheckResponse = unknown;

export type UploadUploadZipData = {
    formData: Body_upload_upload_zip;
};

export type UploadUploadZipResponse = unknown;

export type $OpenApiTs = {
    '/api/v1/health/health': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Not found
                 */
                404: unknown;
            };
        };
    };
    '/api/v1/upload/upload': {
        post: {
            req: {
                formData: Body_upload_upload_zip;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Not found
                 */
                404: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
};