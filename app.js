const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')


const PORT = config.get('port') || 5000

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {console.log(`App has been started on port ${PORT}`)})
    } catch (error) {
        console.log('Server error', error.message)
        process.exit(1)
    }
}

start()