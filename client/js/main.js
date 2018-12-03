const socket = io();
const ctx = document.getElementById('ctx').getContext('2d');
ctx.font = '30px Arial';

socket.on('newPos', (data) => {
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillText('P', data.x, data.y);
})
