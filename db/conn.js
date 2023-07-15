const {MongoClient} = require('mongodb');
const uri = 'mongodb://0.0.0.0:27017/todolist'

const client = new MongoClient(uri);

try {
    client.connect().then(() => {
        console.log('conectado')
    })
} catch (error) {
    console.log("error",error)
}

module.exports = client