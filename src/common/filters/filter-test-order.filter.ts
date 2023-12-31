import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Catch()
export class TestOrderFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        if (host.getType() === 'http') {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            const error =
                typeof response === 'string'
                    ? { message: exceptionResponse }
                    : (exceptionResponse as object);

            response.status(status).json({
                ...error,
                timestamp: new Date().toISOString(),
            });
        } else if (host.getType() === 'rpc') {
            // do something that is only important in the context of Microservice requests
        }
    }
}
