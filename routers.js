const express = require('express')
const path = require('path')

const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public' })

const routers = express.Router()

// kode koneksi db mongo
// const client = require('./connection')
require('./connection')
const Product = require('./Product')
const ObjectId = require('mongodb').ObjectId

// routes ambil semua data produk
routers.get('/products', async (req, res) => {

    // kode menampilkan list products
    // const db = client.db('latihan_awal_bukureactid')
    const products = await Product.find()

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

})


// routes untuk mengambil single produk gunakan singular
routers.get('/product/:id', async (req, res) => {

    // kode menampilkan single products
    // const db = client.db('latihan_awal_bukureactid')
    const product = await Product.findById(req.params.id)

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

})

// routes untuk tambah produk gunakan url singular
routers.post('/product', multer().none(), async (req, res) => {

    // kode menambah data product
    const { name, price, stock, status } = req.body

    try {
        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            status: status
        })

        if (product) {
            res.send({
                status: 'success',
                message: 'tambah product success',
                data: product
            })
        } else {
            res.send({
                status: 'warning',
                message: 'tambah product gagal'
            })
        }

    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
    }

})

// routers untuk ubah produk gunakan url singular
routers.put('/product/:id', multer().none(), async (req, res) => {
    // kode mengupdate data product
    const { name, price, stock, status } = req.body
    try {
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                name: "",
                price: price,
                stock: stock,
                status: status
            },
            { runValidators: true }
        )
        if (result.ok == 1) {
            res.send({
                status: 'success',
                message: 'update product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'update product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
    }
})


// routers untuk delete produk gunakan url singular
routers.delete('/product/:id', async (req, res) => {

    // kode menghapus data products
    try {
        const result = await Product.deleteOne(
            {
                _id: ObjectId(req.params.id)
            }
        )
        if (result.deletedCount == 1) {
            res.send({
                status: 'success',
                message: 'delete product success',
                data: result
            })
        } else {
            res.send({
                status: 'warning',
                message: 'delete product gagal',
                data: result
            })
        }
    } catch (error) {
        res.send({
            status: 'error',
            message: error.message
        })
    } r



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