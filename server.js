const http = require('http');

// Crear el servidor
const server = http.createServer((req, res) => {
  // Establecer el tipo de contenido a 'application/json'
  res.setHeader('Content-Type', 'application/json');
  
  // Manejo de rutas y métodos
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Bienvenido a la página de inicio' }));

  } else if (req.url === '/hola' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hola Mundo' }));

  } else if (req.url === '/datos' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Obtener los datos enviados en el cuerpo de la solicitud
    });
    
    req.on('end', () => {
      const datos = JSON.parse(body);
      res.writeHead(201); // Código 201: Creado
      res.end(JSON.stringify({ message: 'Datos recibidos correctamente', datos }));
    });

  } else if (req.url === '/recurso' && req.method === 'PUT') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Recurso actualizado' }));

  } else if (req.url === '/recurso' && req.method === 'DELETE') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Recurso eliminado' }));

  } else {
    // Manejo de errores: ruta no encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
