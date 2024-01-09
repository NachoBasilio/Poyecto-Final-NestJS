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

import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('users')
  async registerUser(
    @Body() body: { username: string; password: string; isAdmin: boolean },
  ) {
    return this.authService.registerUser(
      body.username,
      body.password,
      body.isAdmin,
    );
  }

  // Obtener detalles de un usuario específico
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  getUserDetails(@Param('id') userId: string) {
    return this.authService.getUserDetails(userId);
  }

  // Listado de usuarios (restringido a administradores)
  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  // Actualizar un usuario específico (solo su propio perfil o si es administrador)
  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  updateUser(
    @Param('id') userId: string,
    @Body() body: { username?: string; password?: string; isAdmin?: boolean },
  ) {
    return this.authService.updateUser(userId, body);
  }

  // Eliminar un usuario (solo administradores)
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  deleteUser(@Param('id') userId: string) {
    return this.authService.deleteUser(userId);
  }
}
