import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
    const search = match.params.search
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(search, pageNumber))
    }, [dispatch, search, pageNumber])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? ( <Loader /> ) 
            : error ? ( <Message variant='danger'>{error}</Message> ) 
            :(<>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} search={search ? search : ''} />
            </>)}
        </>
    )
}

export default HomeScreen
