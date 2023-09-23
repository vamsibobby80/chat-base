
//const io = require("socket.io-client");
const socket=io('http://localhost:8000', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messagecontainer=document.querySelector(".container");   //gets the first element with class value conatiner

const append= (message, position)=>{
  const messageElement=document.createElement('div');
  messageElement.innerText=message;
  messageElement.classList.add('message');  
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);  
}

const name = prompt("Enter your name");

socket.emit('new-user-joined', name );

form.addEventListener('submit', (e)=>{
  e.preventDefault();    //don't take normal event flow, handles differently doesnt reload
  const message=messageInput.value;
  append(`${name} : ${message}`,'right');
  socket.emit('send', message);
  messageInput.value='';

})

socket.on('user-joined', name =>{
  append(`${name} joined the chat`,'right');  //adds the message of rohan added the chat
})

socket.on('receive', data =>{
  append(`${data.name}:${data.message}`,'left');  //actual message text {here whole object from index.js will be in data obj}
})

socket.on('left', name=>{
  append(`${name} left the chat`,'left');
})