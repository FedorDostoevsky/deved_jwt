const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

//connect mdb
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}
mongoose.connect(process.env.DB_CONNECT, options, () => console.log('connected to mdb.'))

//routes
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
//middleware
app.use(express.json())
//route middlewares
app.use('/api/user', authRoutes)
app.use('/api/posts', postsRoutes)


app.listen(3000, () => console.log('Server is running...'))