import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Review from '../components/Review'


const SingleProduct = () => {
  const { productID } = useParams()
  const [productDetails, setProductDetails] = useState()
  const [reviews, setReviews] = useState([])



  useEffect(() => {
    const getSingleProductDetails = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${productID}`)
      console.log(data.productDetails)
      setProductDetails(data.productDetails)
      setReviews(data.reviews)
    }
    getSingleProductDetails()
  }, [])

  return (
    <section className="w-11/12 m-auto">
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div className=" h-96">
          <img src={productDetails?.imgUrl} alt="" className="h-full w-full object-contain" />
        </div>
        <div className=" ">
          <h1 className="uppercase text-3xl font-black text-header">{productDetails?.title}</h1>
            <p className=" mt-3 whitespace-pre-line font-medium text-sm ">{productDetails?.desc}</p>
          <div className="flex mt-3">
            <button className="uppercase bg-indigo-700 px-7 rounded-md text-white font-black text-xl py-2">Add to Cart</button>
            <button className="flex items-center ml-1 py-2 px-7 bg-primary-gray uppercase text-header font-black text-xl rounded-md">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>  
      <div className="my-10  ">
        <h1 className="uppercase text-3xl font-black text-header">Reviews</h1>
        {
          reviews?.map(({name, reviewTitle, reviewBody, rating, reviewedAt}) => <Review name={name} title={reviewTitle} body={reviewBody} rating={rating} reviewedAt={reviewedAt} />)
        }
      </div>  
      
    </section>
  )
}

export default SingleProduct
