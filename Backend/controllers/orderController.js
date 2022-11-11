import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
//  create new order
//  access: private
//  route GET /order
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
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//  GET order details by ID
//  access: private
//  route GET /order/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // fill users name and email value
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order is not found");
  }
});

//  update order  by payment on specific ID
//  access: private
//  route put /orders/:id/pay
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order is not found");
  }
});

//  get order list of the user
//  access: private
//  route get /orders/myorders
export const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//  get order list of all the users
//  access: private
//  route get /orderlist
export const getOrderList = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

//  update order  by payment on specific ID
//  access: private, only to admin
//  route put /orders/:id/deliver
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredDate = Date.now();
    console.log(order.deliveredAt)
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order is not found");
  }
});
