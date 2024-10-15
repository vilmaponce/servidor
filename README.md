# Servidor HTTP Básico con Node.js

Este proyecto crea un servidor HTTP básico utilizando el módulo `http` de Node.js. El servidor maneja varias rutas y métodos HTTP, y puede recibir y procesar datos enviados por el cliente.

## Pasos para Crear el Servidor

### Paso 1: Importar el módulo `http`

```javascript
const http = require('http');
```

¿Por qué?: Node.js tiene un módulo nativo llamado http que nos permite crear servidores web. No necesitas instalar nada extra para usar este módulo, ya que viene integrado en Node.js.
¿Para qué?: Este módulo proporciona herramientas para manejar solicitudes HTTP (como GET, POST, etc.) y enviar respuestas al cliente.

```javascript
const server = http.createServer((req, res) => {
```

¿Por qué?: Utilizamos el método createServer() del módulo http para crear un nuevo servidor.
¿Para qué?: Esta función recibe un callback que se ejecuta cada vez que alguien hace una solicitud a nuestro servidor. En este caso, el callback tiene dos parámetros:
req: Representa la solicitud (request), que contiene detalles como la URL, el método HTTP (GET, POST, etc.) y otros datos de la petición del cliente.
res: Representa la respuesta (response), que es lo que enviaremos de vuelta al cliente.

```javascript
res.setHeader('Content-Type', 'application/json');
```
¿Por qué?: Cada vez que enviamos una respuesta al cliente, debemos indicar qué tipo de datos estamos enviando.
¿Para qué?: Aquí establecemos el encabezado Content-Type como application/json, lo que le dice al navegador (o cliente) que las respuestas estarán en formato JSON (muy común cuando manejamos APIs).
Paso 4: Manejar las rutas y métodos HTTP
Aquí es donde definimos cómo el servidor debe comportarse cuando recibe solicitudes en diferentes rutas (/, /hola, /datos, etc.) y con distintos métodos HTTP (GET, POST, PUT, DELETE).

Ruta GET / - Página de inicio
```
if (req.url === '/' && req.method === 'GET') {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Bienvenido a la página de inicio' }));
}
```
¿Por qué?: Esta es la ruta principal (/) y solo responde a solicitudes GET.
¿Para qué?: En esta ruta, respondemos con un código de estado 200 (OK) y un mensaje JSON que dice "Bienvenido a la página de inicio".
Ruta GET /hola - Hola Mundo

```
else if (req.url === '/hola' && req.method === 'GET') {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Hola Mundo' }));
}
```
¿Por qué?: Aquí estamos manejando una solicitud GET en la ruta /hola.
¿Para qué?: Cuando alguien visita http://localhost:3000/hola, respondemos con el mensaje "Hola Mundo". Esto es similar al ejemplo básico que te mostré primero.
Ruta POST /datos - Enviar datos al servidor
```
else if (req.url === '/datos' && req.method === 'POST') {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const datos = JSON.parse(body);
    res.writeHead(201);
    res.end(JSON.stringify({ message: 'Datos recibidos correctamente', datos }));
  });
}
```
¿Por qué?: Esta ruta permite al cliente enviar datos al servidor utilizando el método POST.
¿Para qué?: Aquí estamos capturando los datos enviados en el cuerpo de la solicitud (req.on('data')), y una vez que los recibimos completamente, los procesamos (JSON.parse()) y respondemos con un mensaje confirmando la recepción de los datos.
Ejemplo: Puedes enviar datos como { "nombre": "Juan" } y el servidor los devolverá junto con el mensaje "Datos recibidos correctamente".

```
else if (req.url === '/recurso' && req.method === 'PUT') {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Recurso actualizado' }));
}
```
¿Por qué?: Esta ruta maneja solicitudes PUT, que normalmente se utilizan para actualizar información.
¿Para qué?: Simulamos la actualización de un recurso y respondemos con un mensaje "Recurso actualizado".
Ruta DELETE /recurso - Eliminar un recurso
```
else if (req.url === '/recurso' && req.method === 'DELETE') {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Recurso eliminado' }));
}
```
¿Por qué?: Esta ruta maneja solicitudes DELETE, que suelen usarse para eliminar recursos.
¿Para qué?: Simulamos la eliminación de un recurso y enviamos una respuesta indicando que el recurso ha sido eliminado.
Paso 5: Manejo de errores - Ruta no encontrada
```
else {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}
```
¿Por qué?: Necesitamos manejar el caso en el que el usuario intenta acceder a una ruta que no existe.
¿Para qué?: Si ninguna de las rutas anteriores coincide con la solicitud, respondemos con un error 404 (No encontrado) y un mensaje JSON "Ruta no encontrada".
Paso 6: Escuchar en un puerto
```
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
```
¿Por qué?: El servidor necesita "escuchar" en un puerto específico para recibir solicitudes.
¿Para qué?: Aquí estamos indicando que el servidor escuchará en el puerto 3000. Cuando el servidor está listo, imprime un mensaje en la consola: "Servidor escuchando en http://localhost:3000".
¿Qué hemos logrado?
Múltiples rutas y métodos HTTP: El servidor responde a rutas específicas (/, /hola, /datos, /recurso) y diferentes métodos HTTP (GET, POST, PUT, DELETE).
Recepción de datos: En la ruta POST /datos, el servidor puede recibir y procesar datos enviados desde el cliente.
Manejo de errores: Si el cliente intenta acceder a una ruta no definida, el servidor responde con un error 404 indicando que la ruta no existe.
Servidor funcional: Todo esto lo puedes probar en tu navegador o con herramientas como curl o Postman.

Ruta PUT /recurso - Actualizar un recurso
