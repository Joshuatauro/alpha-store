import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
const SingleOrder = () => {
  const { id } = useParams()

  useEffect(() => {
    const getOrderDetails = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/users/order/${id}`, { withCredentials: true })
      console.log(data)
    }
    getOrderDetails()
  }, [])
  

  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-max">ORDER{id}</h1>
      <div className="grid grid-cols-2 gap-3 my-10">

      </div>
    </section>
  )
}


export default SingleOrder
