import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import OrderItem from '../components/OrderItem'

const SingleOrder = () => {
  const { id } = useParams()
  const [orderContent, setOrderContent] = useState([])

  useEffect(() => {
    const getOrderDetails = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/users/order/${id}`, { withCredentials: true })
      console.log(data.orderDetails)
      setOrderContent(data.orderDetails.order_content)
    }
    getOrderDetails()
  }, [])
  

  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-max">ORDER{id}</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {
          orderContent.map(({name, price, sale_price, is_sale, url, id}) => <OrderItem name={name} price={price} salePrice={sale_price} onSale={is_sale} url={url} id={id} key={id} />)
        }
      </div>
    </section>
  )
}



export default SingleOrder
