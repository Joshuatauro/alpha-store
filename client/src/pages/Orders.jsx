import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import OrderCard from '../components/OrderCard';

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
          orders.map(({id, order_content, is_delivered, created_at, total}) => <OrderCard key={id} id={id} orderContent={order_content} isDelivered={is_delivered} total={total} createdAt={created_at} />)
        }
      </div>
    </section>
  )
}


export default Orders
