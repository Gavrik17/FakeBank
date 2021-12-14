// Главный файл
// Подключение модулей и библиотек
const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoute = require('./routes/home')
const profileRoute = require('./routes/profile')
const authRoute = require('./routes/auth')
const addPersonRoute = require('./routes/addperson')
const addCreditRoute = require('./routes/addcredit')
const addDepositRoute = require('./routes/adddeposit')
const offersRoute = require('./routes/offers')
const editRoute = require('./routes/edit')

const isAuthMW = require('./middleware/handlerAuth')
const personMW = require('./middleware/personMW')
const postMW = require('./middleware/postMW')


const MONGO_URI = "mongodb://localhost:27017/bank"

const app = express()

// Шаблонизатор
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
          },
      
  })

// Подключение сессий
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGO_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))

// Обработчики Middleware
app.use(isAuthMW)
app.use(personMW)
app.use(postMW)

// Обработка путей (routes)
app.use('/', homeRoute)
app.use('/addperson', addPersonRoute)
app.use('/profile', profileRoute)
app.use('/auth', authRoute)
app.use('/addcredit', addCreditRoute)
app.use('/adddeposit', addDepositRoute)
app.use('/offers', offersRoute)
app.use('/edit', editRoute)

const port = 3000

// Запуск приложения
async function run(){
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

run()