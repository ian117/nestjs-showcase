// import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

// @Catch()
// export class ExtendedFilter<T> implements ExceptionFilter {
//     catch(exception: T, host: ArgumentsHost) {}
// }

import { Catch, ArgumentsHost, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter } from '@nestjs/core';

// @Injectable({ scope: Scope.REQUEST })
@Catch()
export class ExtendedFilter extends BaseExceptionFilter {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    // private counter: number = 0;

    catch(exception: unknown, host: ArgumentsHost) {
        console.log(this.configService.get('NODE_ENV'));
        // console.log(this.counter);
        // this.counter++;
        if (process.env.NODE_ENV == 'development') {
            console.log('Sentry Not Used on Development');
        } else if (process.env.NODE_ENV == 'production') {
            console.log('Doing Devops Error Struff');
        } else {
            console.log('Sentry Dont Used on Test');
        }
        super.catch(exception, host);
    }
}
