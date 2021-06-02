import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    //number of items per 'page'
    const pagination = 5
    //get current page from query or default to 1
    const page = Number(req.query.pageNumber) || 1

    const search = req.query.search ? {
        name: {
            $regex: req.query.search,
            $options: 'i'
        }
    } : {}

    //get total number of products
    const count = await Product.countDocuments({ ...search })
    //limit products to number of items per page(.limit(pagination)), and then determine which index to start query at(.skip(pagination * (page-1)))
    const products = await Product.find({ ...search }).limit(pagination).skip(pagination * (page-1))

    //return products, current page, and total number of pages
    res.json({ products, page, pages: Math.ceil(count / pagination)})
})

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc Create a product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Product name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Product brand',
        category: 'Product category',
        countInStock: 0,
        numReviews: 0,
        description: 'Product description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc Update a product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name        
        product.price = price        
        product.description = description        
        product.image = image        
        product.brand = brand        
        product.category = category        
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

//@desc Create a product review
//@route POST /api/products/:id/reviews
//@access Private
const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        //check if user has an existing review for the product
        const existingReview = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        
        //if so, return 400
        if(existingReview) {
            res.status(400)
            throw new Error('You have already reviewed this product.')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        //add review to product reviews array
        product.reviews.push(review)


        product.numReviews = product.reviews.length

        //combine product review ratings into one number and then divide by number of product reviews to get an average rating
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length


        await product.save()
        res.status(201).json({ message: 'Review added.'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    createReview,
    updateProduct
}