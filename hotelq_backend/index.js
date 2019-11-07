const express = require('express')
const bodyParser = require('body-parser')
// const multer = require('multer');
require('express-group-routes')

const app = express()

const port = process.env.PORT || 4000

app.use(bodyParser.json())
// app.use('./public/uploads', express.static('public/uploads'))


// Controllers
const RoomsController = require('./controllers/rooms')
const CustomersController = require('./controllers/customers')
const OrdersController = require('./controllers/orders')
const AuthController = require('./controllers/auth')
const HistoriesController = require('./controllers/histories')

// Middleware
const { authenticated } = require('./middleware')
const { upload } = require('./upload')


app.get('/', (req, res) => {
    res.send('Sukses')
})
app.group('/api/v2', (router)=>{

    // User
    router.get('/user', AuthController.index)
    router.get('/user/:id', authenticated, AuthController.index)
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    // Rooms 
    router.get('/rooms', authenticated, RoomsController.index)
    // ROOMS CREATE 
    router.post('/room',authenticated, RoomsController.store)
    // ROOMS EDIT 
    router.patch('/room/:room_id',authenticated, RoomsController.update)
    // ROOMS DELETE 
    router.delete('/room/:room_id', authenticated, RoomsController.remove)
    
    

    // customers 
    router.get('/customers',authenticated,CustomersController.index)
    router.get('/customer/:id',authenticated,CustomersController.getCustumerById)
    // customers CREATE 
    router.post('/customer',authenticated, CustomersController.store)
    // router.post('/customer', authenticated, upload.single('image'), CustomersController.store)

    // customers UPDATE 
    router.patch('/customer/:customer_id',authenticated, CustomersController.update)
    // customers DELETE 
    router.delete('/customer/:customer_id', authenticated, CustomersController.remove)


    // Orders 
    router.get('/checkin',authenticated,OrdersController.index)
    // Order CREATE 
    router.post('/checkin',authenticated, OrdersController.store)
    // Order UPDATE 
    router.delete('/checkout/:order_id',authenticated, OrdersController.checkout)
    

    // History
    router.post('/histories',authenticated, HistoriesController.store)

    

}),

app.listen(port, () => console.log(`Listening on port ${port}!`))
