import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cart = () => {
  const  [cart, setCart] = useState([])

  useEffect(() => {
    const fetchCartItems = async() => {
      const { data } = await axios.get('http://localhost:5000/api/users/cart', { withCredentials: true })
      console.log(data.cart)
      setCart(data.cart)
    }
    fetchCartItems()
  }, [])

  const addToWishlist = async(id) => {
    console.log(id)
  }

  const removeFromCart = async(id) => {
    console.log(id)
    const {data} = await axios.post(`http://localhost:5000/api/actions/remove-from-cart`, cart[id] , {withCredentials: true})
    console.log(data)
  }

  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-min">CART</h1>
      <div className="grid grid-cols-3">
        <div className=" col-span-2 mt-5">
          {cart.map((item, index) => <CartItem key={item.id} dataKey={index} addToWishlist={addToWishlist} removeFromCart={removeFromCart} id={item.id} name={item.name} price={item.price} quantity={item.quantity} sale_price={item.sale_price} is_sale={item.sale_price} url={item.url} />)}
        </div>
      </div>
    </section>
  )
}



const CartItem = ({name, price, sale_price, is_sale, url, quantity, addToWishlist, removeFromCart, id, dataKey}) => {
  
  return(
    <article className="w-full border-2 mb-4 border-indigo-600 shadow-md rounded-md">
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
                <span className="text-white bg-indigo-600 p-1 font-semibold rounded-md text-sm">$ {is_sale ? price : sale_price}</span>
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
