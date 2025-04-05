import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ConfirmMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method
    const url = req.originalUrl
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress// IP del cliente
    const userAgent = req.headers['user-agent'] // Dispositivo/Navegador
    const authHeader = req.headers['authorization'] // Token si usa autenticación
    console.log('\n----------------------DETAILS----------------------')
    console.log(`🔹 Request Details:`)
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    console.log(`🔹 IP: ${ip}`)
    console.log(`🔹 User-Agent: ${userAgent}`)
    
    if (authHeader) {
      console.log(`🔹 Token: ${authHeader}`)
    }
    console.log('\nrequest:')
    console.log(`🔹 Host:`)
    console.log(req.host)
    console.log(`🔹 Body:`)
    console.log(JSON.stringify(req.body, null, 4))
    console.log(`🔹 Query:`)
    console.log(req.query)
    console.log(`🔹 Params:`)
    console.log(req.params)

    console.log('\nresponse:')
    console.log(`estatus code: ${res.statusCode}`)
    console.log(`status message: ${res.statusMessage}`)
    console.log(`headers sent: ${res.headersSent}`)
    console.log('----------------------DONE----------------------\n')



    next();
  }
}