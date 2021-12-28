import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const OrderCard = ({orderContent, isDelivered, createdAt, id, total}) => {

  return (
    <article className="border border-indigo-600 shadow-md w-full py-3 rounded-md">
      <div className="w-11/12 m-auto">
        <h1 className="font-bold text-header">ORDER{id}</h1>
        <div className="flex font-semibold uppercase text-sm">
          <h1 className="text-gray-600 ">Status:</h1>
          {isDelivered ? <h1 className="text-green-600">Delivered</h1> : <h1 className="text-yellow-600">En-route</h1>}
        </div>
        <div className="flex font-semibold uppercase text-sm">
          <h1 className="text-gray-600 ">Ordered:</h1>
          <Moment className="text-header" format="DD/MM/YYYY">
            {createdAt}
          </Moment>
        </div>
        <div className="flex font-semibold uppercase text-sm">
          <h1 className="text-gray-600 ">Summary:</h1>
          <h1 className="text-header">{orderContent.map(item => {
            const splitWord = item.name.split(' ')
            console.log(splitWord)
            return (
              splitWord[splitWord.length-1]+', '
            )
          })}</h1>
        </div>
        <div className="flex font-semibold uppercase text-sm">
          <h1 className="text-gray-600 ">Billed Amount:</h1>
          <h1 className="text-header">₹{total}</h1>
        </div>
        <div className="flex ">
          {
            isDelivered ? (
              <Link to={`/order/${id}`} className=" mt-3 w-full justify-center uppercase rounded-md transition-all duration-200 hover:opacity-95 text-white mr-2 font-bold py-3 flex items-center bg-indigo-700 ">
                Review Order
              </Link>
            ) : (
              <Link className=" mt-3 w-full justify-center uppercase rounded-md transition-all duration-200 text-white mr-2 font-bold py-3 flex items-center bg-gray-700 cursor-not-allowed ">
                Cant review yet
              </Link>
            )
          }
        </div>
      </div>
    </article>
  )
}

export default OrderCard
