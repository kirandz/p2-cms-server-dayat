if(process.env.Node_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const { errorHandler } = require('./Middleware/Handlererror')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
const router = require('./routes/index')

app.use(cors()) // cors harus diletakkan teratas di atas express url encoded json dll harus diinvoke
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/',router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// module.exports=app