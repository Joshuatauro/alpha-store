import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Review from '../components/Review'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css' 
import { EditorState } from 'draft-js'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'


const SingleProduct = () => {
  const { productID } = useParams()
  const [productDetails, setProductDetails] = useState()
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    const getSingleProductDetails = async() => {

      const { data } = await axios.get(`http://localhost:5000/api/products/${productID}`, { withCredentials: true })
      console.log(data.productDetail)
      setProductDetails(data.productDetail)
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(data.productDetail.description)
        )
      )
    }
    getSingleProductDetails()
  }, [])

  const addToCart = async() => {
    // console.log(typeOf quantity)
    const { data } = await axios.post('http://localhost:5000/api/actions/add-to-cart', {productDetails, quantity}, {withCredentials: true})
    console.log(data)
  }

  const addToWishlist = async() => {
    const { data } = await axios.post('http://localhost:5000/api/actions/add-to-wishlist', productDetails, {withCredentials: true})
    console.log(data)
  }

  return (
    <section className="w-11/12 m-auto">
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div className=" h-96">
          <img src={productDetails?.url} alt="" className="h-full w-full object-contain" />
        </div>
        <div>
          {
            productDetails?.is_sale && (
              <span className="bg-green-500 rounded-md min-w-max  text-white text-sm font-bold py-px px-2 ml-1  ">ON SALE</span>
            )
          }
          <h1 className="uppercase text-3xl font-black text-header mb-2">{productDetails?.name}</h1>
          <span className="p-2 bg-indigo-600 text-white mt-20  rounded-md font-bold text-lg">${productDetails?.is_sale ? productDetails?.sale_price : productDetails?.price}</span>
          <Editor 
            editorState={editorState}
            id="input"
            className=" font-"
            placeholder="DESCRIPTION"
            editorClassName="font-barlow font-medium text-gray-700 "
            toolbarHidden
          />
          <div className=" mt-3">
            <div className="relative mb-2">
              <input value={quantity} onChange={e => setQuantity(e.target.value)}  required type="number" min='1' max='10' name="email" id="input" className="special text-white pt-3 h-16 w-20 focus:outline-none px-3 font-semibold bg-indigo-700 rounded-md" />
              <label id="main" htmlFor="input" className="main-label  absolute left-3 text-white top-6 mb-0.5 font-bold text-xs">QUANTITY</label>
            </div>
            <div className="flex">
              <button className="uppercase bg-indigo-700 px-7 rounded-md text-white font-bold text-lg py-2" onClick={addToCart}>Add to Cart</button>
              <button className="flex items-center ml-1 py-2 px-7 bg-primary-gray uppercase text-header font-bold text-lg rounded-md">
                Add to Wishlist
              </button>
            </div>
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
