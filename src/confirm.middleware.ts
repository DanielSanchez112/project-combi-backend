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

    console.log(`\n\n🔹 Request Details:`)
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    console.log(`🔹 IP: ${ip}`)
    console.log(`🔹 User-Agent: ${userAgent}`)
    
    if (authHeader) {
      console.log(`🔹 Token: ${authHeader}`)
    }
    console.log(`🔹 Headers:`)
    console.log(req.headers)
    console.log(`🔹 Body:`)
    console.log(req.body)
    console.log(`🔹 Query:`)
    console.log(req.query)
    console.log(`🔹 Params:`)
    console.log(req.params)
    console.log('response:')
    console.log(res.statusCode)
    console.log(res.statusMessage)
    console.log(res.headersSent)
    console.log(res.getHeaders())
    console.log('----------------------DONE----------------------\n')



    next();
  }
}