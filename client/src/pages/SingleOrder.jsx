import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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

const OrderItem = ({name, price, salePrice, onSale, url, id}) => {
  return(
    <article className="w-full border border-indigo-600 rounded-md">
      <div className="px-4 py-3">
        <div className="grid grid-cols-3">
          <img src={url} className=" h-36 flex items-center justify-center w-full object-contain mix-blend-multiply" alt=""  />
          <div className="ml-5 col-span-2 flex flex-col justify-between">
            <div className="">
              <div href={`/products/${id}`}>
                <a>
                  <h1 className="text-lg uppercase text-header font-extrabold ">{name}</h1>
                </a>
              </div>
              <div className="flex mt-1">
              <span className="p-2 bg-indigo-600 text-white  rounded-md font-semibold text-sm">₹{onSale ? salePrice : price}</span>
              </div>
            </div>
            <div className=" flex flex-col items-end w-full">
              <Link to= {
                {
                  pathname: `/order/${id}/review`,
                  state: {name, price, salePrice, onSale, url, id}
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


export default SingleOrder
