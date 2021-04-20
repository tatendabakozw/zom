const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./db')
const cors = require('cors')
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(cors({ methods: "*", origin: '*' }))

//setting up socket io
io.on('connection', function (socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

//definig the port
const port = process.env.PORT || 6789

//connecting database
connectDB()

//app level middleware
// app.use(express.static(__dirname + '/uploads'));
app.use('/api/v1/', express.static(path.join(__dirname, 'uploads')));
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.get('/',(req,res)=>res.json({message: 'zom api'}))


//user defined rpoutes
const authRoute = require('./routes/auth')
const orderRoute = require('./routes/order')
const serviceRoute = require('./routes/service')
const productRoute = require('./routes/product')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const subcategoryRoute = require('./routes/subcategory')
const reviewRoute = require('./routes/review')
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/subcategory', subcategoryRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/order', orderRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/service', serviceRoute)
app.use('/api/v1/user', userRoute)

//serve static folder for deploymeny
// app.use('/static', express.static(path.join(__dirname, 'bondsonauction/build')));
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'bondsonauction', 'build', 'index.html'))
// })

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server Listening on port ${port}`)
    }
})