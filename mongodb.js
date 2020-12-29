const MongoClient = require('mongodb').MongoClient
// const connectionString = "mongodb://localhost:27017"; // tanpa authentication
const connectionString = "mongodb://user_latihan_bukureactid:123456@localhost:27017?authSource=admin";


(async () => {
    try {
        const client = await MongoClient.connect(connectionString, {
            useUnifiedTopology: true
        })

        // nama db
        const db = client.db('latihan_awal_bukureactid')

        // kode query ke collection quotes
        // const quotes = await db.collection('quotes').find().toArray()
        // const quote = await db.collection('quotes').findOne()
        const quotes = await db.collection('quotes').find({
            word: 'gitu aja kok repot'
        }).toArray()
        console.log(quotes)

    } catch (error) {
        console.error(error);
    }
})();
