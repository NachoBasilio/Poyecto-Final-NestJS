import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, username: user.username, isAdmin: user.isAdmin };
    }
    return null;
  }

  login(user: any) {
    const payload = {
      name: user.username,
      id: user.id,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(
    username: string,
    password: string,
    isAdmin: boolean = false,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      isAdmin,
    });
    return newUser.save();
  }

  async getUserDetails(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(
    userId: string,
    data: { username?: string; password?: string; isAdmin?: boolean },
  ): Promise<User> {
    // Encuentra y actualiza el usuario en la base de datos
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    // Verifica si el usuario existe
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    // Encuentra y elimina el usuario de la base de datos
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    // Verifica si el usuario existe
    if (!deletedUser) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  }
}
