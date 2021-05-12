const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },

});

io.on('connection', socket => {
    console.log(socket.id)

    socket.on("sendMessage", (data) => {
        console.log(data)
        socket.broadcast.emit('serverMessage', { data })

    })

})

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
})


server.listen(port, () => {
    console.log(`Server connected on port ${port}`);
})






