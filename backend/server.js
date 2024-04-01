const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const dbConfig = require('./db')
const userRoute = require('../backend/routes/userRoute')
const productRoute = require('../backend/routes/productRoute')
const catalogRoute = require('../backend/routes/catalogRoute')
const cartRoute = require('../backend/routes/cartRoute')
const orderRoute = require('../backend/routes/orderRoute')
/*const postRoute = require('../routes/postRoute')*/

app.use(cors())
app.use(express.json({ limit: '1024mb' }))
app.use(express.urlencoded({ extended: true, limit: '1024mb' }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/catalog', catalogRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

/*app.use('/api/post', postRoute)*/

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port: ${port}`))
