import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users') // Define la ruta base para este controlador, por ejemplo, "/users"
@UseGuards(JwtAuthGuard) // Aplica el guardia de autenticación JWT a todas las rutas del controlador
export class UsersController {
  @Get() // Ejemplo de una ruta protegida
  getProtectedData() {
    return {
      message: 'Información protegida',
      user: {
        name: 'nacho',
      },
    };
  }
}
