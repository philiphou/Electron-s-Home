import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
//  create new order
//  access: private
//  route GET /api/order
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
});


//  GET order details by ID
//  access: private
//  route GET /api/order/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email') // fill users name and email value
  if(order){
    res.json(order)
  }else{
    res.status(404)
    throw new Error('Order is not found')
  }
});
