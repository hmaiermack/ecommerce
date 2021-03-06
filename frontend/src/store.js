import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers'
import { useDetailsReducer, userDeleteReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers.js'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers.js'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: useDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer

})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))

    export default store