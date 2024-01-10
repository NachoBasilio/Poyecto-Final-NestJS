// users.controller.ts
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    return this.usersService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async registerUser(
    @Body() body: { username: string; password: string; isAdmin: boolean },
  ) {
    return this.usersService.registerUser(
      body.username,
      body.password,
      body.isAdmin,
    );
  }

  // Obtener detalles de un usuario específico
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserDetails(@Param('id') userId: string) {
    return this.usersService.getUserDetails(userId);
  }

  // Listado de usuarios (restringido a administradores)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  // Actualizar un usuario específico (solo su propio perfil o si es administrador)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() body: { username?: string; password?: string; isAdmin?: boolean },
  ) {
    return this.usersService.updateUser(userId, body);
  }

  // Eliminar un usuario (solo administradores)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
