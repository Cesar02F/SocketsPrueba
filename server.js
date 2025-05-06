const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  // Importa el middleware CORS

// Crear una aplicaci�n Express
const app = express();
const server = http.createServer(app);

// Configurar Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'https://prueba83.b-ebs.com',  // Permitir solo este dominio (puedes agregar m�s dominios si lo necesitas)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

// Configuraci�n de CORS para Express (si no la has cambiado)
app.use(cors({
  origin: 'https://prueba83.b-ebs.com',  // El dominio desde el cual se har� la conexi�n
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Servir los archivos est�ticos desde la carpeta 'public'
app.use(express.static('public'));

// Evento de conexi�n de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  // Escuchar por mensajes enviados por el cliente
  socket.on('sendMessage', (message) => {
    console.log('Mensaje recibido:', message);
    // Emitir el mensaje a todos los clientes EXCEPTO al que lo envi�
    socket.broadcast.emit('receiveMessage', message);
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
