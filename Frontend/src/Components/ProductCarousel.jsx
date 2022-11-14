import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { Carousel, CarouselItem, Image } from "react-bootstrap";

export default function ProductCarousel() {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productListTop);
  const { loading, error, products } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover"  id="cbgc" >
      {products.map((p) => (
        <CarouselItem Interval = {1000} key={p._id}>
          <Link to={`/products/${p._id}`}>
            <Image src={p.image} alt={p.name} fluid></Image>
            <Carousel.Caption className="carousel-caption">
                <h2>{p.name}(${p.price})</h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
