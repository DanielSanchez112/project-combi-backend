import { Controller, Post, Body, UsePipes, ValidationPipe, UseFilters, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SuccessInterceptor } from 'src/SI';
import { GlobalExceptionFilter } from 'src/GEF';
@Controller('auth')
@UseFilters(new GlobalExceptionFilter())
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginDto) {
    console.log(Body, loginDto);
    return this.authService.login(loginDto);
  }
}