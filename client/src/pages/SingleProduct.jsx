import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Review from '../components/Review'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css' 
import { EditorState } from 'draft-js'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { AuthContext } from '../context/AuthContext'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


import toast, { Toaster } from 'react-hot-toast';

const toastAddToCartSuccess = () => toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-green-600 text-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="w-11/12 m-auto py-3">
      Item added to cart
    </div>
  </div>
))


const SingleProduct = () => {
  const {setCartLength} = useContext(AuthContext)
  const { productID } = useParams()
  const [productDetails, setProductDetails] = useState()
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)

  const [cartLoading, setCartLoading] = useState(false)

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

      const reviewData = await axios.get(`http://localhost:5000/api/products/${productID}/reviews`, { withCredentials: true })
      setReviews(reviewData.data.reviews)
    }
    getSingleProductDetails()
  }, [])

  const addToCart = async() => {
    setCartLoading(true)
    const { data } = await axios.post('http://localhost:5000/api/actions/add-to-cart', {productDetails, quantity}, {withCredentials: true})
    if(data.addedToCart){
      //* TOAST NOTIF SAYING SUCCESS
      toastAddToCartSuccess()
      setCartLoading(false)
      setCartLength(data.cartLength)
    } else {
      //* TOAST NOTIF SAYING ERROR
      setCartLoading(false)
    }
  }

  const addToWishlist = async() => {
    const { data } = await axios.post('http://localhost:5000/api/actions/add-to-wishlist', productDetails, {withCredentials: true})
    console.log(data)
  }

  return (
    <section className="w-11/12 m-auto">
       <Toaster
        position="bottom-right"
        toastOptions={{
          duration:2000
        }}
        
      />
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
            editorClassName="font-barlow font-medium text-gray-700 cursor-default"
            toolbarHidden
          />
          <div className=" mt-3">
            <div className="relative mb-2">
              <input value={quantity} onChange={e => setQuantity(e.target.value)}  required type="number" min='1' max='10' name="email" id="input" className="special text-white pt-3 h-16 w-20 focus:outline-none px-3 font-semibold bg-indigo-700 rounded-md" />
              <label id="main" htmlFor="input" className="main-label  absolute left-3 text-white top-6 mb-0.5 font-bold text-xs">QUANTITY</label>
            </div>
            <div className="flex">
              {
                cartLoading ? (
                  <button className="px-7 uppercase rounded-md cursor-not-allowed transition-all duration-200 hover:opacity-95 text-white mr-2 font-bold text-lg py-3 flex items-center bg-indigo-700 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={addToCart} className="px-7 uppercase rounded-md transition-all duration-200 hover:opacity-95 text-white mr-2 font-bold text-lg py-3 flex items-center bg-indigo-700 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                )
              }
              
              <button className="px-7 rounded-md text-gray-700 transition-all duration-200 hover:opacity-95 font-bold text-lg py-3 flex items-center bg-primary-gray ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              </button>
            </div>
          </div>
        </div>
      </div>  
      <div className="my-10  ">
        <h1 className="uppercase text-3xl font-black text-header">Reviews</h1>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1020: 2}} className="mt-3">
          <Masonry gutter="15px"> 
            {
              reviews?.map(({name, title, review, rating, created_at}) => <Review name={name} title={title} review={review} rating={rating} createdAt={created_at} />)
            }
          </Masonry>
        </ResponsiveMasonry>
        <div className="grid grid-cols-2 gap-3 mt-3">
          
        </div>
      </div>  
      
    </section>
  )
}

export default SingleProduct
