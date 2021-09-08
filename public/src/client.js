const socket = io();

socket.on('connect', () => {
  console.log('conectado');
});

const messages = document.getElementById('messages');

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});
// aqui recibe el cliente el mensaje desde el servidor
socket.on('enviar-mensaje', (payload) => {
  const item = document.createElement('li');
  item.textContent = payload.mensaje;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  console.log(payload);
});

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    mensaje: input.value,
    id: '1234',
    fecha: new Date(),
  };
  console.log(payload.id);
  // emito el mensaje desde este cliente al servidor
  if (payload) {
    socket.emit('enviar-mensaje', payload, (id) => {
      console.log('Desde el server', id);
    });
    input.value = '';
  }
});
