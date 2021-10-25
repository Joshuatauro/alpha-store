import React from 'react'
import axios from 'axios'

const WishlistItem = ({url, name, onSale, salePrice, price, dataKey, removeFromWishlist, addToCart}) => {

  return (
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
                  <h1 className="flex items-center uppercase font-semibold">{name}</h1>
                  <p className="text-xs font-medium uppercase text-gray-800">Sold by <span className="text-black font-semibold">AlphaStore</span></p>
                </div>
                <span className="text-white bg-indigo-600 p-1 font-semibold rounded-md text-sm">₹ {onSale ? salePrice : price}</span>
              </div>
              <div className="flex">
                <button onClick={e => addToCart({url, name, on_sale:onSale, price, sale_price:salePrice},dataKey)} className="text-xs uppercase bg-gray-300 font-medium hover:bg-indigo-700 hover:text-white duration-300 transition-all px-2 py-2 rounded-md">Move to cart</button>
                <button onClick={e => removeFromWishlist(dataKey)} className="text-xs uppercase bg-gray-300 font-medium hover:bg-red-700 ml-2 hover:text-white duration-300 transition-all px-2 py-2 rounded-md">Remove item</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default WishlistItem
