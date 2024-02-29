import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>){
    }
    async createUser(email: string, password: string): Promise<User>{
        return this.userModel.create({
            email,
            password
        })
    }
    async getUser(query: Object): Promise<User>{
        return this.userModel.findOne(query);
    }
}
