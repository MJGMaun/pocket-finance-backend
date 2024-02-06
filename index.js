const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const transactionRoute = require('./routes/transaction');


dotenv.config()
// process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((err) => console.log(err));

app.use(express.json())
app.get('/', (req, res) => res.send('Hello, teh'));
app.use("/api/", authRoute) // localhost:5001/api/register
app.use("/api/users/", userRoute) // localhost:5001/api/users/id
app.use("/api/transactions/", transactionRoute) // localhost:5001/api/transactions/id

app.listen(process.env.PORT || 5002, console.log(`App listening on port ${process.env.PORT}`));