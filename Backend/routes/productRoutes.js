import express from "express";

import {getProducts,getProductById} from '../controllers/productController.js'
const router = express.Router();

router.route('/').get(getProducts)
//  fetch specific product: access: public
router.route('/:id').get(getProductById)
export default router;
