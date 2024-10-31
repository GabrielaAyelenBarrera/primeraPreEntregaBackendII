📦 Primer Preentrega - Sistema de Autenticación con JWT

Este proyecto implementa un sistema de autenticación basado en tokens JWT y cookies en una aplicación Node.js con Express y MongoDB. 
Se enfoca en la autenticación de usuarios mediante el uso de Passport, y proporciona endpoints para registro, inicio de sesión y obtención de la información del usuario actual.

🚀 Estructura del Proyecto

📦 PRIMERAPREENTREGA

 ┣ 
 📂 src

 ┃ ┣ 📂 config

 ┃ ┃ ┗ 📜 passport.js         # Configuración de Passport para JWT

 ┃ ┣ 📂 controllers

 ┃ ┃ ┗ 📜 authController.js   # Controladores para registro, login y usuario actual

 ┃ ┣ 📂 models

 ┃ ┃ ┗ 📜 user.js             # Modelo de usuario con encriptación de contraseña

 ┃ ┣ 📂 routes

 ┃ ┃ ┗ 📜 sessionsRouter.js   # Rutas para autenticación de sesiones

 ┃ ┗ 📜 app.js                # Configuración principal de Express

 ┣ 📜 .env                    # Variables de entorno (MONGO_URI, JWT_SECRET, PORT)

 ┣ 📜 .gitignore              # Archivos y carpetas ignorados en el control de versiones

 ┣ 📜 package-lock.json       # Archivo de dependencias generado automáticamente

 ┗ 📜 package.json            # Información de dependencias y scripts del proyecto
 

🔧 Configuración y Dependencias

El proyecto utiliza las siguientes tecnologías y dependencias:

Express como servidor de aplicaciones.
MongoDB y Mongoose para la base de datos y modelado de datos.
JWT (jsonwebtoken) para generación y validación de tokens de autenticación.
Passport y passport-jwt para la autenticación basada en JWT.
bcrypt para el hash de contraseñas.
cookie-parser para manejo de cookies.
dotenv para manejar variables de entorno.
Variables de Entorno (.env)
Asegúrate de tener las siguientes variables configuradas en tu archivo .env:

MONGO_URI=mongodb://<tu_mongodb_uri>
JWT_SECRET=<tu_clave_secreta>
PORT=8080

🔄 Funcionamiento del Proyecto

El sistema de autenticación consta de los siguientes flujos:

Registro de Usuario: Guarda un nuevo usuario en la base de datos después de verificar que el correo no esté registrado.
Inicio de Sesión: Autentica al usuario mediante correo y contraseña, generando un token JWT almacenado en una cookie segura.
Usuario Actual: Obtiene los datos del usuario actual autenticado si tiene un token válido en su cookie.

📬 Endpoints de la API

1. Registro de Usuario

Método: POST
URL: /api/sessions/register

Body (JSON)
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "age": 30,
  "password": "password123",
  "cart": []
}

Respuesta Exitosa: 201 Created
Descripción: Registra un nuevo usuario en la base de datos si el correo no está registrado. Devuelve el mensaje "Usuario registrado".

2. Inicio de Sesión

Método: POST
URL: /api/sessions/login

Body (JSON)
{
  "email": "john@example.com",
  "password": "password123"
}

Respuesta Exitosa: 200 OK
Cookie: Almacena un token JWT en una cookie de nombre token.
Descripción: Autentica al usuario, verifica la contraseña y genera un token JWT almacenado en una cookie HTTP-only.

3. Usuario Actual

Método: GET
URL: /api/sessions/current

Headers: Cookie token obtenida al iniciar sesión.
Respuesta Exitosa: 200 OK
{
  "id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 30,
  "message": "Información del usuario actual"
}

Descripción: Devuelve la información del usuario autenticado usando el token JWT presente en la cookie. Responde con un 401 Unauthorized si el token no es válido o ha expirado.

🧪 Pruebas con Postman

Configuración
Asegúrate de que el servidor está corriendo (npm run dev).
Configura Postman para realizar pruebas en los endpoints de registro, inicio de sesión y usuario actual.
1. Probar Registro de Usuario
Método: POST
URL: http://localhost:8080/api/sessions/register
Body (JSON)

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "age": 30,
  "password": "password123",
  "cart": []
}

Esperado: 201 Created y mensaje "Usuario registrado" si el registro es exitoso.

2. Probar Inicio de Sesión

Método: POST
URL: http://localhost:8080/api/sessions/login

Body (JSON)
{
  "email": "john@example.com",
  "password": "password123"
}

Esperado: 200 OK y mensaje "Login exitoso". Verifica que la respuesta incluya la cookie token.

3. Probar Usuario Actual

Método: GET
URL: http://localhost:8080/api/sessions/current

Headers: La cookie token generada en el paso de inicio de sesión.

Esperado: 200 OK y datos del usuario actual si el token es válido.

Error de Autenticación: Si el token no está presente o ha expirado, devuelve 401 Unauthorized.

🛠️ Consideraciones Adicionales

Error de Conexión con la Base de Datos: Si tienes problemas de conexión, verifica la URI de MongoDB en .env.
Token Expirado: El token tiene una validez de 1 hora. Vuelve a iniciar sesión para obtener uno nuevo si ha expirado.
JWT Seguro: La cookie que contiene el token está marcada como httpOnly y secure para entornos de producción.

📝 Contribuciones y Soporte

Este proyecto está diseñado para la evaluación y aprendizaje del manejo de autenticación en Node.js. Para cualquier problema o sugerencia, me encuentro a disposición.

