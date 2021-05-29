import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct } from '../controllers/productControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'


//@desc Fetch all products
//@route GET /api/products
//@access Public
router.route('/').get(getProducts)

router.route('/:id').get(getProductById).delete(protect, isAdmin, deleteProduct)


export default router