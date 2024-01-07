# Documentación del Proyecto Final - Blog

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

