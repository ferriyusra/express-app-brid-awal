const express = require('express')
const path = require('path')

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public' })

const routers = express.Router()

// kode koneksi db mongo
const client = require('./connection')
const ObjectId = require('mongodb').ObjectId

// routes ambil semua data produk
routers.get('/products', async (req, res) => {
    if (client.isConnected()) {

        // kode menampilkan list products
        const db = client.db('latihan_awal_bukureactid')
        const products = await db.collection('products').find().toArray()

        if (products.length > 0) {
            res.send({
                status: 'success',
                message: 'list products ditemukan',
                data: products
            })
        } else {
            res.send({
                status: 'success',
                message: 'list products tidak ditemukan',
            })
        }

    } else {
        res.send({
            staus: 'error',
            message: 'koneksi database gagal'
        })
    }
})


// routes untuk mengambil single produk gunakan singular
routers.get('/product/:id', async (req, res) => {
    if (client.isConnected()) {

        // kode menampilkan single products
        const db = client.db('latihan_awal_bukureactid')
        const product = await db.collection('products').findOne({ _id: ObjectId(req.params.id) })


        if (product) {
            res.send({
                status: 'success',
                message: 'data single product ditemukan',
                data: product
            })
        } else {
            res.send({
                status: 'error',
                message: 'data single product tidak ditemukan'
            })
        }



    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })

    }
})

// routes untuk tambah produk gunakan url singular
routers.post('/product', multer().none(), async (req, res) => {
    if (client.isConnected()) {

        // kode menambah data product
        const { name, price, stock, status } = req.body
        const db = client.db('latihan_awal_bukureactid')

        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if (result.insertedCount == 1) {
            res.send({
                status: 'success',
                message: 'tambah product success'
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal'
            })
        }
    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })
    }
})

// routers untuk ubah produk gunakan url singular
routers.put('/product/:id', multer().none(), async (req, res) => {
    if (client.isConnected()) {
        // kode mengupdate data product
        const { name, price, stock, status } = req.body
        const db = client.db('latihan_awal_bukureactid')
        const result = await db.collection('products').updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    name: name,
                    price: price,
                    stock: stock,
                    status: status
                }
            }
        )

        if (result.matchedCount == 1) {
            res.send({
                status: 'success',
                message: 'update product success'
            })
        } else {
            res.send({
                status: 'warning',
                message: 'update product gagal'
            })
        }

    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })
    }
})

// routers untuk delete produk gunakan url singular
routers.delete('/product/:id', async (req, res) => {
    if (client.isConnected()) {
        // kode menghapus data products
        const db = client.db('latihan_awal_bukureactid')
        const result = await db.collection('products').deleteOne(
            {
                _id: ObjectId(req.params.id)
            }
        )

        if (result.deletedCount == 1) {
            res.send({
                status: 'success',
                message: 'delete product success'
            })
        } else {
            res.send({
                status: 'warning',
                message: 'delete product gagal'
            })
        }

    } else {
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })
    }
})




// routers.get('/', (req, res) => res.send('hello worldsss'))

// routers.get('/post/:id?', (req, res) => {
//     if (req.params.id)
//         res.send('artikel-' + req.params.id)
// })


// routers.post('/login', (req, res) => {
//     const { username, password } = req.body
//     res.send(`anda login dengan username ${username} dan password ${password}`)
// })


// routers.get('/download', function (req, res) {
//     const fileName = 'lord.jpg'
//     res.sendFile(path.join(__dirname, fileName))
// })

// routers.get('/download2', function (req, res) {
//     const filename = 'lord.jpg'
//     res.sendFile(path.join(__dirname, filename), {
//         headers: {
//             'Content-Disposition': 'attachment; filename="lord-utama.jpg"'
//         }
//     })
// })

// routers.get('/download3', function (req, res) {
//     const fileName = 'lord.jpg'
//     res.download(path.join(__dirname, fileName), 'lord-utamaxx.jpg')
// })

// routers.get('/preview-image', function (req, res) {
//     const fileName = 'lord.jpg'
//     res.sendFile(path.join(__dirname, fileName), {
//         headers: {
//             'Content-Type': 'image/jpg'
//         }
//     })
// })


// routers.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file
//     if (file) {
//         const target = path.join(__dirname, 'public', file.originalname)
//         fs.renameSync(file.path, target)
//         res.send('file berhasil diupload')
//     } else {
//         res.send('file gagal di upload')
//     }
// })


// routers.post('/register', upload.single('avatar'), (req, res) => {
//     const name = req.body.name
//     const avatar = req.file
//     res.send({
//         name: name,
//         avatar: avatar
//     })
// })


module.exports = routers