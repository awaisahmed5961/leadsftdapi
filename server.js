const express = require('express');
const connectDB = require('./config/db');
const app = express();
const morgan = require('morgan');

// Connect DataBase
connectDB();

app.use(morgan('dev'));
// Init Middleware
app.use(express.json({ limit: '50mb', extended: false }));



app.use('/customer', require('./routes/customers'));


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;