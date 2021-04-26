const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000

mongoose.connect("mongodb+srv://tenish:1234@cluster0.meuda.mongodb.net/ecom?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//Check if we are connected zto the Database
mongoose.connection.once("open", () => console.log("We are connected to the database"))

app.use(cors())
app.use(express.json())

//Define the routes
app.use("/users", require('./routes/users'))
app.use("/items", require('./routes/items'))
app.use("/carts", require('./routes/carts'))
app.use("/orders", require('./routes/orders'))
app.use(express.static('public'))

app.listen(PORT, () => console.log(`App is listening in port ${PORT}`))