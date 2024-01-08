# Documentación del Proyecto Final - Blog

## Comandos para iniciar el proyecto

Para iniciar el proyecto, puedes usar los siguientes comandos que se encuentran en el archivo `package.json`:

- `build`: Compila el proyecto. Ejecuta el comando `nest build`.
- `format`: Formatea los archivos del proyecto. Ejecuta el comando `prettier --write \"src/**/*.ts\" \"test/**/*.ts\"`.
- `start`: Inicia el proyecto. Ejecuta el comando `nest start`.
- `start:dev`: Inicia el proyecto en modo desarrollo. Ejecuta el comando `nest start --watch`.
- `start:debug`: Inicia el proyecto en modo debug. Ejecuta el comando `nest start --debug --watch`.
- `start:prod`: Inicia el proyecto en modo producción. Ejecuta el comando `node dist/main`.
- `lint`: Lintea el proyecto. Ejecuta el comando `eslint \"{src,apps,libs,test}/**/*.ts\" --fix`.
- `test`: Ejecuta las pruebas del proyecto. Ejecuta el comando `jest`.
- `test:watch`: Ejecuta las pruebas del proyecto en modo watch. Ejecuta el comando `jest --watch`.
- `test:cov`: Ejecuta las pruebas del proyecto y genera un reporte de cobertura. Ejecuta el comando `jest --coverage`.
- `test:debug`: Ejecuta las pruebas del proyecto en modo debug. Ejecuta el comando `node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand`.
- `test:e2e`: Ejecuta las pruebas end-to-end del proyecto. Ejecuta el comando `jest --config ./test/jest-e2e.json`.

## Dependencias del proyecto

El proyecto tiene las siguientes dependencias y dependencias de desarrollo:

### Dependencias

- `@nestjs/common`: "^10.0.0"
- `@nestjs/core`: "^10.0.0"
- `@nestjs/jwt`: "^10.2.0"
- `@nestjs/mongoose`: "^10.0.2"
- `@nestjs/passport`: "^10.0.3"
- `@nestjs/platform-express`: "^10.0.0"
- `bcrypt`: "^5.1.1"
- `mongoose`: "^8.0.3"
- `mongoose-autopopulate`: "^1.1.0"
- `passport`: "^0.7.0"
- `passport-jwt`: "^4.0.1"
- `passport-local`: "^1.0.0"
- `reflect-metadata`: "^0.1.13"
- `rxjs`: "^7.8.1"

### Dependencias de desarrollo

- `@nestjs/cli`: "^10.0.0"
- `@nestjs/schematics`: "^10.0.0"
- `@nestjs/testing`: "^10.0.0"
- `@types/bcrypt`: "^5.0.2"
- `@types/express`: "^4.17.17"
- `@types/jest`: "^29.5.2"
- `@types/node`: "^20.3.1"
- `@types/passport-jwt`: "^3.0.13"
- `@types/passport-local`: "^1.0.38"
- `@types/supertest`: "^2.0.12"
- `@typescript-eslint/eslint-plugin`: "^6.0.0"
- `@typescript-eslint/parser`: "^6.0.0"
- `dotenv`: "^16.3.1"
- `eslint`: "^8.42.0"
- `eslint-config-prettier`: "^9.0.0"
- `eslint-plugin-prettier`: "^5.0.0"
- `jest`: "^29.5.0"
- `prettier`: "^3.0.0"
- `source-map-support`: "^0.5.21"
- `supertest`: "^6.3.3"
- `ts-jest`: "^29.1.0"
- `ts-loader`: "^9.4.3"
- `ts-node`: "^10.9.1"
- `tsconfig-paths`: "^4.2.0"
- `typescript`: "^5.1.3"

## Configuración de Jest

La configuración de Jest para el proyecto es la siguiente:

```json
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}
```

## Endpoints para Usuarios

### Registro de Nuevos Usuarios

- **Método:** POST
- **URL:** `/auth/register`
- **Body:**
  - **JSON:**
    ```json
    {
      "username": "<nombre_de_usuario>",
      "password": "<contraseña>",
      "isAdmin": <true_o_false>
    }
    ```

### Inicio de Sesión para Usuarios

- **Método:** POST
- **URL:** `/auth/login`
- **Body:**
  - **JSON:**
    ```json
    {
      "username": "<nombre_de_usuario>",
      "password": "<contraseña>"
    }
    ```

### Listado de Usuarios (restringido a administradores)

- **Método:** GET
- **URL:** `/auth/users`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Obtener Detalles de un Usuario Específico

- **Método:** GET
- **URL:** `/auth/users/{id}`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Actualizar un Usuario Específico (solo su propio perfil o si es administrador)

- **Método:** PUT
- **URL:** `/auth/users/{id}`
- **Body:**
  - **JSON:**
    ```json
    {
      "username": "<nuevo_nombre_de_usuario>",
      "password": "<nueva_contraseña>",
      "isAdmin": <true_o_false>
    }
    ```
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Eliminar un Usuario (solo administradores)

- **Método:** DELETE
- **URL:** `/auth/users/{id}`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

# Documentación del Proyecto Final - Blog

## Endpoints para Posts

### Crear un Nuevo Post (solo usuarios registrados)

- **Método:** POST
- **URL:** `/posts`
- **Body:**
  - **JSON:**
    ```json
    {
      "title": "<titulo_del_post>",
      "content": "<contenido_del_post>",
      "categories": ["<categoria1>", "<categoria2>", ...]
    }
    ```
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Listado de Todos los Posts

- **Método:** GET
- **URL:** `/posts`
- **Query Parameters:**
  - `limit` (número de resultados por página, default: 10)
  - `page` (número de página, default: 1)

### Ver Detalles de un Post Específico

- **Método:** GET
- **URL:** `/posts/{id}`

### Actualizar un Post (solo el autor o administradores)

- **Método:** PUT
- **URL:** `/posts/{id}`
- **Body:**
  - **JSON:**
    ```json
    {
      "title": "<nuevo_titulo_del_post>",
      "content": "<nuevo_contenido_del_post>",
      "categories": ["<nueva_categoria1>", "<nueva_categoria2>", ...]
    }
    ```
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Eliminar un Post (solo el autor o administradores)

- **Método:** DELETE
- **URL:** `/posts/{id}`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Ver Todos los Posts de un Usuario Específico

- **Método:** GET
- **URL:** `/posts/user/{userId}`

## Búsqueda y Filtrado

### Buscar Posts

- **Método:** GET
- **URL:** `/posts/search`
- **Query Parameters:**
  - `query` (término de búsqueda)
  - `limit` (número de resultados por página, default: 10)
  - `page` (número de página, default: 1)

### Filtrar Posts

- **Método:** GET
- **URL:** `/posts/filter`
- **Query Parameters:**
  - `category` (categoría a filtrar)
  - `author` (autor a filtrar)
  - `limit` (número de resultados por página, default: 10)
  - `page` (número de página, default: 1)

## Administración

### Obtener Todos los Usuarios (solo administradores)

- **Método:** GET
- **URL:** `/admin/users`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Eliminar Usuarios (solo administradores)

- **Método:** DELETE
- **URL:** `/admin/users/{id}`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```

### Obtener Todos los Posts con Opciones de Moderación (solo administradores)

- **Método:** GET
- **URL:** `/admin/posts`
- **Headers:**
  - **JSON:**
    ```json
    {
      "Authorization": "Bearer <tu_token_de_acceso>"
    }
    ```


Cada endpoint protegido debe ser asegurado mediante el middleware de autenticación y, para las rutas administrativas, un middleware adicional que verifique si el usuario es un administrador. Los endpoints serán documentados para su consumo en un frontend, y se incluirán tests y logging según sea necesario.


# Trabajo práctico final (consigna)

Vamos a programar algo que toda persona que programa hace al menos una vez en su vida: nuestro propio blog. Para esto vamos a definir una serie de endpoints RESTful para gestionar usuarios, posts y autenticación. Considerando la utilización de MongoDB y un middleware de autorización para usuarios administradores, los endpoints podrían quedar de la siguiente manera:

### **Usuarios**

- **`POST /users`** - Registro de nuevos usuarios. Cada usuario debe tener nombre de usuario, contraseña, y un booleano isAdmin
- **`POST /users/login`** - Inicio de sesión para usuarios.
- **`GET /users`** - Listado de usuarios (restringido a administradores).
- **`GET /users/{id}`** - Obtener detalles de un usuario específico.
- **`PUT /users/{id}`** - Actualizar un usuario específico (solo su propio perfil o si es administrador).
- **`DELETE /users/{id}`** - Eliminar un usuario (solo administradores).

### **Posts**

- **`POST /posts`** - Crear un nuevo post (solo usuarios registrados). Los post tendrán id, título, autor, contenido y un array de categorías
- **`GET /posts`** - Listado de todos los posts. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/{id}`** - Ver detalles de un post específico.
- **`PUT /posts/{id}`** - Actualizar un post (solo el autor o administradores).
- **`DELETE /posts/{id}`** - Eliminar un post (solo el autor o administradores).
- **`GET /posts/user/{userId}`** - Ver todos los posts de un usuario específico.

### **Búsqueda y Filtrado**

- **`GET /posts/search`** - Buscar posts por título, contenido, etc. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/filter`** - Endpoints adicionales para filtrar posts por categoría o autor

### **Administración**

- **`GET /admin/users`** - Obtener todos los usuarios (solo administradores).
- **`DELETE /admin/users/{id}`** - Eliminar usuarios (solo administradores).
- **`GET /admin/posts`** - Obtener todos los posts con opciones de moderación (borrar o editar) (solo administradores).

Cada endpoint protegido debe ser asegurado mediante el middleware de autenticación, y para las rutas administrativas, un middleware adicional que verifique si el usuario es un administrador. 

Los endpoints deberán ser documentados para poder ser consumidos por un frontend. También se incluirán test y logging donde corresponda.

