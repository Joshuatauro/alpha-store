import React from 'react'
import { Link } from 'react-router-dom'
const OrderItem = ({name, price, salePrice, onSale, url, id}) => {
  console.log(id, 'hello')
  return(
    <article className="w-full border border-indigo-600 rounded-md">
      <div className="px-4 py-3">
        <div className="grid grid-cols-3">
          <img src={url} className=" h-36 flex items-center justify-center w-full object-contain mix-blend-multiply" alt=""  />
          <div className="ml-5 col-span-2 flex flex-col justify-between">
            <div className="">
              <Link href={`/products/${id}`}>
                  <h1 className="text-lg uppercase text-header font-extrabold ">{name}</h1>
              </Link>
              <div className="flex mt-1">
              <span className="p-2 bg-indigo-600 text-white  rounded-md font-semibold text-sm">₹{onSale ? salePrice : price}</span>
              </div>
            </div>
            <div className=" flex flex-col items-end w-full">
              <Link to= {
                {
                  pathname: `/order/${id}/review`,
                  state: {name, price, salePrice, onSale, url, productID:id}
                }
              } className=" mt-3 px-3 justify-center uppercase rounded-md transition-all duration-200 hover:opacity-95 text-white text-sm mr-2 font-bold py-3 flex items-center bg-indigo-700 ">
                Review Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default OrderItem
