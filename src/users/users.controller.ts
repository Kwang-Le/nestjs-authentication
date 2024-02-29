import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('email') email: string
    ): Promise<User>{
        const saltRounds = 10
        const hashedPasswords = await bcrypt.hash(password, saltRounds)
        const result = this.userService.createUser(
            email, hashedPasswords
        )
        return result
    }
}
