require('dotenv').config()

const express = require('express')
const app = express()
const mogoose = require('mongoose')

mogoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mogoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => { console.log("Connected to database ") })

app.use(express.json())

const iceCreamRouter = require('./routes/icecreamRouter')
app.use('/icecream', iceCreamRouter)

app.listen(3000, ()=> console.log("Server started on port 3000"))