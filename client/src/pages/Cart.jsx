import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import toast, { Toaster } from 'react-hot-toast';

const toastOrderSuccess = () => toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-green-600 text-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="w-11/12 m-auto py-3">
      Successfully placed the order. Look outside the window!
    </div>
  </div>
))


const Cart = () => {
  const { setCartLength } = useContext(AuthContext)
  const history = useHistory()
  const [cart, setCart] = useState([])
  const [cartAmount, setCartAmount] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const reducerFunction = (previousValue, currentValue) => previousValue + currentValue
  
  useEffect(() => {
    const fetchCartItems = async() => {
      const { data } = await axios.get('http://localhost:5000/api/users/cart', { withCredentials: true })
      setCart(data.cart)
      
    }
    fetchCartItems()
  }, [])

  useEffect(() => {
    if(cart.length > 0){
      setCartAmount(cart.map(item => item.is_sale ? item.sale_price * item.quantity : item.price * item.quantity ).reduce(reducerFunction))
      setDeliveryFee(cartAmount > 2000 ? 0 : 200)
    }
  }, [cart])

  const addToWishlist = async(id) => {
    console.log(id)
  }

  const removeFromCart = async(id) => {
    const {data} = await axios.post(`http://localhost:5000/api/actions/remove-from-cart`, {indexPosition: id} , {withCredentials: true})
    setCart(data.updatedCart)

    if(data.updatedCart.length > 0){
      const cartAmountCalc = data.updatedCart.map(item => item.price * item.quantity)?.reduce(reducerFunction)
      setCartAmount(cartAmountCalc)
      setDeliveryFee(cartAmountCalc > 2000 ? 0 : 200)
    }else {
      setCartAmount(0)
      setDeliveryFee(0)
      setCartLength(0)
    }
  }

  const submitOrder = async() => {
    const orderObject = cart
    setIsLoading(true)
    const {data} = await axios.post('http://localhost:5000/api/actions/submit-order', orderObject, { withCredentials: true })
  
    if(data.placedOrder){
      toastOrderSuccess()
      setIsLoading(false)
      history.push(`/order/${data.orderID}`)
      setCartLength(0)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-11/12 m-auto">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration:2000
        }}
        
      />
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-min">CART</h1>
      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className=" col-span-2 ">
          {cart.length > 0 ? cart.map((item, index) => <CartItem key={item.id} dataKey={index} addToWishlist={addToWishlist} removeFromCart={removeFromCart} id={item.id} name={item.name} price={item.price} quantity={item.quantity} sale_price={item.sale_price} is_sale={item.is_sale} url={item.url} />) : ''}
        </div>
        <div>
          <div className="w-full py-3  rounded-md bg-indigo-700 text-white">
            <div className="w-11/12 m-auto">
              <h1 className="font-bold text-xl">ORDER SUMMARY</h1>
              <div className="flex justify-between mt-2 text-sm uppercase font-medium">
                <h1 className="text-gray-300">Price:</h1>
                <h1 className="">RS {cartAmount}</h1>
              </div>
              <div className="flex justify-between mt-2 text-sm uppercase font-medium">
                <h1 className="text-gray-300">Delivery charges:</h1>
                <h1 className="">RS {deliveryFee}</h1>
              </div>
              <div className="flex justify-between mt-2 text-sm uppercase font-medium">
                <h1 className="text-gray-300">GST Tax:</h1>
                <h1 className="">RS {cartAmount*0.05}</h1>
              </div>
              <div className="flex justify-between mt-5 text-lg uppercase font-medium">
                <h1 className="text-gray-300">Total:</h1>
                <h1 className="">RS {cartAmount + deliveryFee + cartAmount*0.05 }</h1>
              </div>
            </div>
          </div>
          {
            cart.length > 0 && (
              <button onClick={submitOrder} className="uppercase hover:opacity-95 transition-all duration-200 bg-indigo-700 px-7 mt-3 w-full rounded-md text-white font-bold flex justify-center text-lg py-2">
                {
                  isLoading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : 'Place order'
                }
              </button>
            )
          }
          
        </div>
      </div>
    </section>
  )
}



const CartItem = ({name, price, sale_price, is_sale, url, quantity, addToWishlist, removeFromCart, id, dataKey}) => {
  console.log(name)
  return(
    <article className="w-full border mb-4 border-indigo-700 shadow-sm rounded-md">
      <div className="py-2 w-11/12 m-auto">
        <div className="flex">
          <div className="h-28 w-28">
            <img src={url} className=" h-full flex items-center justify-center w-full object-contain" alt=""  />
          </div>
          <div className="ml-5 flex-1">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <div className="">
                  <h1 className="flex items-center uppercase font-semibold">{name} <span className="text-xs ml-1 text-gray-700 ">x {quantity}</span></h1>
                  <p className="text-xs font-medium uppercase text-gray-800">Sold by <span className="text-black font-semibold">AlphaStore</span></p>
                </div>
                <span className="text-white bg-indigo-600 p-1 font-semibold rounded-md text-sm">₹ {is_sale ? sale_price : price}</span>
              </div>
              <div className="flex">
                <button onClick={e => addToWishlist(dataKey)} className="text-xs uppercase bg-gray-300 font-medium hover:bg-indigo-700 hover:text-white duration-300 transition-all px-2 py-2 rounded-md">Move to wishlist</button>
                <button onClick={e => removeFromCart(dataKey)} className="text-xs uppercase bg-gray-300 font-medium hover:bg-red-700 ml-2 hover:text-white duration-300 transition-all px-2 py-2 rounded-md">Remove item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Cart
