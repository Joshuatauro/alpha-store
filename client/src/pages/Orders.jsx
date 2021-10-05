import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useHistory } from 'react-router';

const Orders = () => {
  const history = useHistory()
    const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async() => {
      const { data } = await axios.get('http://localhost:5000/api/users/orders', { withCredentials: true })
      console.log(data.orders)
      setOrders(data.orders)
    }
    getOrders()
  }, [])

  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-min">ORDERS</h1>
      <div className="grid grid-cols-2 gap-3 my-10">
        {
          orders.map(({id, order_content, is_delivered, created_at, total}) => <OrderItem key={id} id={id} orderContent={order_content} isDelivered={is_delivered} total={total} createdAt={created_at} />)
        }
      </div>
    </section>
  )
}

const OrderItem = ({orderContent, isDelivered, createdAt, id, total}) => {
  const history = useHistory()

  const handleRouting = () => {
    history.push(`/order/${id}`)
  }
  
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
          <h1 className="text-header">{orderContent.map(item => item.name+', ')}</h1>
        </div>
        <div className="flex font-semibold uppercase text-sm">
          <h1 className="text-gray-600 ">Billed Amount:</h1>
          <h1 className="text-header">₹{total}</h1>
        </div>
        <div className="flex ">
          <button onClick={handleRouting} className=" mt-3 w-full justify-center uppercase rounded-md transition-all duration-200 hover:opacity-95 text-white mr-2 font-bold py-3 flex items-center bg-indigo-700 ">
            Review Order
          </button>
        </div>
      </div>
    </article>
  )
}

export default Orders
