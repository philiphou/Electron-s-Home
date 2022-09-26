const express=require('express')
const app = express()
const products=require('./data/products')
app.get('/',(req,res)=>{
    res.send('we are now good to go')
})
app.get('/api/products',(req,res)=>{
    res.json(products)
})
app.get('/api/products/:id',(req,res)=>{
    console.log(req.params)
    const product = products.find(e=>(e._id===req.params.id))
    res.json(product)
   
})
app.listen(5000,()=>{
    console.log('server is on at 5000')
})