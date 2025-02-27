import { Controller, Post, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginDto) {
    console.log(Body, loginDto);
    return this.authService.login(loginDto);
  }
}