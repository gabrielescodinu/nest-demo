import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) { }

    @Post('register')
    async register(
        @Body(ValidationPipe) createUserDto: Partial<User>,
    ): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(
        @Body(ValidationPipe) loginData: Pick<CreateUserDto, 'email' | 'password'>,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(loginData.email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const passwordIsValid = await user.validatePassword(loginData.password);

        if (!passwordIsValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // Qui dovresti generare e restituire un token di accesso (ad esempio, JWT)
        // Per semplicità, restituiremo un token fittizio
        const access_token = 'dummy_token';
        return { access_token };
    }
}
