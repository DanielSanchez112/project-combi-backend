import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { request } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = 'Error interno del servidor'
        let errors = null
        if (exception instanceof HttpException){
            status = exception.getStatus()
            message = exception.message

            const exceptionResponse = exception.getResponse()
            if (typeof exceptionResponse === 'object' && "mesagge" in exceptionResponse){
                errors = exceptionResponse["mesagge"]
            }
        }

        else if (exception.code && exception.code.startsWith('P')) {
            status = HttpStatus.BAD_REQUEST;
            message = this.getPrismaErrorMessage(exception);
        }

        else if (exception.name == "QueryFailedError"){
            status = HttpStatus.BAD_REQUEST
            message = exception.message
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: message,
            ...(errors && { errors }),
            error: exception instanceof Error ? exception.name : 'Unknown Error'
          })
    }
    private getPrismaErrorMessage(exception: any){
        switch (exception.code){
            case 'P2002':
                return `Error de unicidad: ${exception.meta.target.join(', ')}`
            case 'P¨2003':
                return `Error de violación de llave foránea: ${exception.meta.target.join(', ')}`
            case 'P2014':
                return `Error de longitud: ${exception.meta.target.join(', ')}`
            case 'P2015':
                return `Error de tipo de dato: ${exception.meta.target.join(', ')}`
            case 'P2016':
                return `Error de valor nulo: ${exception.meta.target.join(', ')}`
            case 'P2017':
                return `Error de valor único: ${exception.meta.target.join(', ')}`
            case 'P2018':
                return `Error de valor máximo: ${exception.meta.target.join(', ')}`
            case 'P2019':
                return `Error de valor mínimo: ${exception.meta.target.join(', ')}`   
            case 'P2025':
                return `Error de referencia: ${exception.meta.target.join(', ')}`    
            default:
                return exception.message
        }
    }
}