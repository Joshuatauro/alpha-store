import axios from 'axios'
import React, { useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast';

const toastSubmittedReviewSuccess = () => toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-green-600 text-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="w-11/12 m-auto py-3">
      Submitted your review! Thank you!
    </div>
  </div>
))

const toastSubmittedReviewFailure = () => toast.custom((t) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-red-600 text-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="w-11/12 m-auto py-3">
      Could not submit your review, please do try again later
    </div>
  </div>
))


const ReviewProduct = (props) => {

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState()
  const [review, setReview] = useState('')

  const submitReview = async(e) => {
    e.preventDefault()
    const productObject = {
      title, rating, review, product_id: id
    }
    const { data } = await axios.post('http://localhost:5000/api/actions/submit-review', productObject, {withCredentials: true})
    console.log(data)
    if(data.wasSuccess){
      toastSubmittedReviewSuccess()
    } else{
      toastSubmittedReviewFailure()
    }
  }

  const { url, id, price, salePrice, onSale, name } = props.location.state

  return (
    <section className="w-11/12 m-auto">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration:2000
        }}
        
      />
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-max">REVIEW YOUR PURCHASE</h1>
      <div className="grid grid-cols-3 gap-3 mt-7">
        <article  className="border-2 rounded-md relative border-indigo-700 h-64 shadow-sm text-header">
          <div className="py-3 w-11/12 m-auto flex flex-col">
            <div className=" flex items-center justify-center h-44">
              <img src={url} alt="" className='object-contain w-11/12 h-full ' />
            </div>
              <div className="flex">
              <h1 className="uppercase font-bold">{name}</h1>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-sm bg-indigo-700 text-white px-2 py-px rounded-md">&#8377;{onSale ? salePrice : price}</span>
            </div>
          </div>
        </article>
        <form onSubmit={submitReview} className="col-span-2 h-full">
          <div className="grid grid-cols-4 gap-3">
            <div className="relative col-span-3">
              <input value={title} onChange={e => setTitle(e.target.value)} required type="text" name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
              <label id="main"  className=" main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs">TITLE</label>
            </div>
            <div className="relative">
              <input value={rating} onChange={e => setRating(e.target.value)} required type="number" name="title" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
              <label id="main"  className=" main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs">RATING</label>
            </div>
          </div>
          <div className="relative mt-3">
            <textarea value={review} onChange={e => setReview(e.target.value)} required type="" name="review" id="input" className="pt-6 h-44 w-full resize-none focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main"  className=" main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs">RATING</label>
          </div>
          <button type="submit" className="w-full bg-indigo-600 rounded-md text-lg mt-1 text-white h-12 font-bold ">SUBMIT</button>
        </form>
      </div>
    </section>
  )
}


export default ReviewProduct
