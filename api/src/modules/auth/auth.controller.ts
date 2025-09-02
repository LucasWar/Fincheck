import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { SignupDto } from './dto/singup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signin')
  authenticate(@Body() authenticateDTO: AuthenticateDTO){
    return this.authService.authenticate(authenticateDTO);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
