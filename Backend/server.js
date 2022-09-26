const express=require('express')
const app = express()
const products=require('./data/products')
const dotenv=require('dotenv')
dotenv.config()

app.get('/',(req,res)=>{
    res.send('we are now good to go')
})
app.get('/api/products',(req,res)=>{
    res.json(products)
})
app.get('/api/products/:id',(req,res)=>{

    const product = products.find(e=>(e._id===req.params.id))
    res.json(product)
   
})
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is on at ${port}`)
})