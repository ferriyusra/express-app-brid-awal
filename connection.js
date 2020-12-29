const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb://user_latihan_bukureactid:123456@localhost:27017?authSource=admin";

const client = new MongoClient(connectionString, {
    useUnifiedTopology: true
});


(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
    }
})();

module.exports = client