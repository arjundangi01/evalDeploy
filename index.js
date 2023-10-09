const express = require('express');
const cors =require('cors')
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const todoRouter = require('./routes/todo.routes');
require('dotenv').config();

const PORT = process.env.PORT
const app = express();
app.use(cors({
    origin:['http://localhost:3000']
}))
app.use(express.json())
app.get('/', (req, res) => {
    res.send('welcome')
})

app.use("/user",userRouter)
app.use("/todos",todoRouter)


app.listen(PORT, async () => {
    try {
        await connection
        console.log(`running og ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})