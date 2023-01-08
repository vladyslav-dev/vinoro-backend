const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errorMiddleware')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// require('dotenv').config()

const authRouter = require('./routes/auth')
const catalogRouter = require('./routes/catalog')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const dashboardRouter = require('./routes/dashboard')
const orderRouter = require('./routes/order')
const questionRouter = require('./routes/question')

const test = require("./api/test");

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use(express.json())
app.use(cookieParser())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

app.use(errorMiddleware)

app.use(cors({
    credentials: true,
    origin: [process.env.ADMIN_PANEL_CLIENT_URL, process.env.MAIN_CLIENT_URL]
}));

app.get('/', (req, res) => {
    res.send('API is working fine')
});

app.use('/api', dashboardRouter)
app.use('/api', questionRouter)
app.use('/api', categoryRouter)
app.use('/api', catalogRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter)
app.use('/api', authRouter)



const start = async () => {
    try {
        if (process.env.DB_URL === undefined) {
            console.error('DB_URL is not defined')
            return
        }
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => console.log('Server has been started on PORT ', PORT))

    } catch (err) {
        console.error(err)
    }
}


start()

