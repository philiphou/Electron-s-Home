import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from 'axios'

import Product from "../Components/Product";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("helloworld");
    const fetchProducts = async()=>{
      const {data}= await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, []);// when array is empty, useEffect will be executed only first time when component rendered
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
}
