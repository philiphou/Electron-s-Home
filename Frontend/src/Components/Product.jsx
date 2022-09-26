import React from 'react'
import {Card, Cart} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

export default function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/products/${product._id}`}>
            <Card.Img className= 'pimg'src={product.image} variant='top'/>
        </Link>
            <Card.Body>
            <Link to={`/products/${product._id}`}>
            <Card.Title as ='div'>
            <strong>{product.name}</strong>

            </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} views`}/>
                </div>
            </Card.Text>
            <Card.Text as='h3'>
               <strong>${product.price}</strong>
            </Card.Text>

            </Card.Body>
       

    </Card>
  )
}
