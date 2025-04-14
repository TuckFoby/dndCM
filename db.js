const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', ()=>{
    console.log('Connected to MongoDB')
})