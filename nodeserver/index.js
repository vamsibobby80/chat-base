// node server
const cors = require('cors');
const io=require('socket.io')(8000,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods :["GET","POST"],
        allowedHeaders: ["my-custom-header"],
       credentials: true
    }
});



const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
       // console.log("user name", name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);   //everyone other than one who joined
    })

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});
    })

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})