const express = require('express')
// const bodyParser = require('body-parser')
const path = require('path')



const app = express()
const port = 3000


// middleware log
const log = (req, res, next) => {
    console.log(Date.now() + ' ' + req.ip + req.originalUrl)
    next()
}
app.use(log)

// penggunaan middleware body parser
// parse x-www-form-url-encode
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
// parse json
// app.use(bodyParser.json())
app.use(express.json())


// built-in middleware yaitu static
app.use(express.static(path.join(__dirname, 'public')))

// deklarasi routing
const routers = require('./routers')
app.use(routers)


// middleware menangani 404
const notFound = (req, res, next) => {
    res.json({
        status: 'error',
        message: 'resource tidak ditemukan'
    })
}
app.use(notFound)

// middleware dengan error handling
// const errorHandling = (err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Terjadi kesalahan')
//     res.json({
//         status: 'error',
//         message: 'terjadi kesalahan pada server'
//     })
// }
// app.use(errorHandling)





// pindahin ini kebawah
app.listen(port, () => console.log(`server running at http://localhost:${port}`))


// app.get('/', (req, res) => {
//     res.write('hello')
//     res.write('world')
//     res.end()
// })

// app.post('/contoh', (req, res) => {
//     res.send('request dengan method POST')
// })

// app.put('/contoh', (req, res) => {
//     res.send('request dengan method PUT')
// })

// app.delete('/contoh', (req, res) => {
//     res.send('request dengan method DELETE')
// })

// app.all('/universal', function (req, res) {
//     res.send(`request dengan method ` + req.method)
// })

//ROUTING DINAMIS
// app.get('/post/:id', (req, res) => {
//     res.send('artikel-' + req.params.id)
// })


// app.get('/foods', (req, res) => {
//     const page = req.query.page ? req.query.page : 1
//     res.write('foods page:' + page + '\n')
//     if (req.query.sort) res.write('sort by:' + req.query.sort)
//     res.end()
// })
//////

//ROUTING DENGAN REGEX
// app.get('/page-*', (req, res) => {
//     res.send('route:' + req.path)
//     res.end()
// })

// app.get('/post/:id?', (req, res) => {
//     res.send('artikel-' + req.params.id)
//     res.end()
// })
// /////////

