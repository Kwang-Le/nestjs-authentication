import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bycrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService){}
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser({email});
        if (!user) throw new NotAcceptableException('could not find the user');
        const passwordValid = await bycrypt.compare(password, user.password)
        if (user && passwordValid) {
            return user
        }
        return null
    }
    async login(user: any) {
        const payload = {username: user.email, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
