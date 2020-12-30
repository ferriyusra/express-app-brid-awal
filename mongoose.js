const mongoose = require('mongoose')

// membuat koneksi ke mongodb
mongoose.connect('mongodb://user_latihan_bukureactid:123456@localhost:27017/latihan_awal_bukureactid?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// membuat schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field nama product harus ada'],
        minlength: [3, 'field nama product harus lebih dari 3 kata'],
        maxlength: [10, 'field nama product tidak boleh lebih dari 10 kata']
    },
    price: {
        type: Number,
        required: [true, 'field harga harus di isi'],
        min: [1000, 'field harga tidak boleh kurang dari 1000'],
        max: [20000, 'field harga tidak boleh lebih dari 20000'],
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
})

// membuat model dan ditulisakan singular, misalkan singular product dan plural products ini sudah otomatis terhubung apabila menggumakan singular dan plural
const Product = mongoose.model('Product', productSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'conncection error:'))
db.once('open', async () => {
    // query disini
    // menampilkan semua data
    // const query = Product.find()
    // query.where({ 'stock': { $gte: 5 } })
    // query.select('name stock') // hanya mengambil field name dan stock gunakan spasi untuk memisahkan
    // const list_products = await query.exec()
    // console.log(list_products)

    // atau dengan chaining method
    const list_products = await Product.find()
        .select('name stock')
        .where({ 'stock': { $gte: 5 } })
        .limit(3)
        .sort({ stock: -1 })
        .exec()
    console.log(list_products)

    // const products = await Product.find()
    // console.log(products)

    // menampilkan single product / data
    // const product = await Product.findOne({
    //     _id: '5fe59be636edb10c7e277e32'
    // })
    // console.log(product)


    // menambahkan data product baru
    // try {
    //     const newProduct = await Product.create({
    //         name: 'USB type c',
    //         price: 50000,
    //         stock: 20,
    //         status: true
    //     })
    //     console.log(newProduct)
    // } catch (error) {
    //     const error_name = error.errors['name'] && error.errors['name'].message
    //     const error_price = error.errors['price'] && error.errors['price'].message
    //     if (error_name) {
    //         console.log(error_name)
    //     } else if (error_price) {
    //         console.log(error_price)
    //     }
    //     // console.log(error.message)
    // }

    // atau dengan cara membuat objek baru dari model, kemudian
    // menyimpannya dengan fungsi save.
    // const newProduct = new Product()
    // newProduct.name = 'Meja'
    // newProduct.price = 2000
    // newProduct.stock = 10
    // newProduct.status = true
    // const insert = await newProduct.save()
    // console.log(insert)


    // mengupdate data product
    // const updateProduct = await Product.findById('5fec024b53730e0dc819716f')
    // updateProduct.name = 'Meja Komputer'
    // const update = await updateProduct.save()
    // console.log(update)


    // menghapus data product
    // await Product.deleteOne(
    //     { _id: '5fec01e11b585030e4027338' }
    // )
    // console.log('berhasil delete')

})
