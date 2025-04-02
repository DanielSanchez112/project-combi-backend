import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class SuccessInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse()

                const statusCode = data?.statusCode || response.statusCode || 200
                return {
                    statusCode: statusCode,
                    success: true,
                    message: data?.message  || 'Petición exitosa',
                    data: data?.data || data

                }
            })
        )
    }
}