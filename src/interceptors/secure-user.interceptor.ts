import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { UserModel } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SecureUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(
          (value: UserModel | null) =>
            value && { ...value, password: undefined },
        ),
      );
  }
}
