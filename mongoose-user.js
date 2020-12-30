const mongoose = require('mongoose')

// membuat koneksi ke mongodb
mongoose.connect('mongodb://user_latihan_bukureactid:123456@localhost:27017/latihan_awal_bukureactid?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// membuat schema users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        // custom validasi
        validate: {
            validator: function (v) {
                return /^\S+@\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: String
})

const User = mongoose.model('User', userSchema)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'conncection error:'))
db.once('open', async () => {

    try {
        const newUser = await User.create({
            username: 'Jon',
            email: 'jon.gmail.com',
            password: '123456'
        })
        console.log(newUser)
    } catch (error) {
        console.log(error.message)
    }

})