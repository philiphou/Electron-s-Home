const express = require('express')
const products = require('./data/products')
const app = express()

app.get('/',(req,res)=>{
    res.send('API is running')
})
app.get('/api/products',(req,res)=>{
    res.json(products)
})
app.get('/api/products/:id',(req,res)=>{
    const product = products.find(e=>e._id===req.params.id)
    res.json(product)
})
app.listen(5000,()=>{
    console.log('server is on at 5000')
})