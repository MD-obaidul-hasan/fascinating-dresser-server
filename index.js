const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hzxv0d7.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try{
        const serviceCollection = client.db('fescinatingDeseer').collection('services');
        const serviceCollections = client.db('fescinatingDeseer').collection('service');
        const orderCollection = client.db('fescinatingDeseer').collection('orders')

        app.get('/services', async(req, res) =>{
            const query ={}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        app.get('/service', async(req, res) =>{
            const query ={}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(6).toArray();
            res.send(services);
        });

        app.get('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        app.get('/service/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollections.findOne(query);
            res.send(service);
        });

        //order api

        // app.get('/reviews', async (req, res) => {
        //     const id = req.query.id;
        //     const query = { service_id: parseInt(id) };
        //     const reviews = await reviewsCollection.find(query).toArray();
        //     res.send(reviews);
        // });
                    // app.get('/review', async(req, res) =>{
                    //     console.log(req.query.email);
                    //     let query = {};
                    //     if(req.query.email){
                    //         query = {
                    //             email: req.query.email
                    //         }
                    //     }
                    //     const cursor = orderCollection.find(query);
                    //     const orders = await cursor.toArray();
                    //     res.send(orders);
                    // });
        app.get('/orders', async(req, res) =>{
            // console.log(req.query.email);
            const query ={};

            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });            

        app.post('/orders', async(req, res) =>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        // app.patch('/reviews/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const status = req.body.status
        //     const query = {_id: ObjectId(id)}
        //     const updatedDoc = {
        //         $set:{
        //             status: status
        //         }
        //     }
        //     const result = await orderCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // })

        // app.delete('/reviews/:id', async(req, res) =>{
        //     const id = req.params.id;
            
        //     const query = {_id: ObjectId(id)};
            
        //     const result = await orderCollection.deleteOne(query);
        //     res.send(result);
        // })
    }
    finally{

    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) =>{
    res.send('fescinating desser server is running')
})

app.listen( port, () =>{
    console.log(`Fescinating dresser server running on ${port}`);
})