import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.auth';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.auth';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'},
    }), MongooseModule.forFeature([{name: 'user', schema: UserSchema}])],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, JwtModule],
  controllers: [AuthController]
})
export class AuthModule {
    
}
