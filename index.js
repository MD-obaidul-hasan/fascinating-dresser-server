const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('fescinating desser server is running')
})

app.listen( port, () =>{
    console.log(`Fescinating dresser server running on ${port}`);
})