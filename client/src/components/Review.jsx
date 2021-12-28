import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import Moment from 'react-moment';

const Review = ({name, title, review, rating, createdAt}) => {
  return (
    <article className="w-full py-4 rounded-md border-2 transition-all duration-200 border-indigo-700 text-header hover:text-white hover:bg-indigo-700">
      <div className="w-11/12 m-auto">
        <h1 className="font-semibold text-md uppercase ">"{title}" <span className="flex items-center">({rating} <AiFillStar className="text-yellow-500" /> )</span></h1>
        <span className="opacity-95 text-xs italic">
          ~ {name} on <Moment className="font-semibold" format="DD MMM YYYY">{createdAt}</Moment>
        </span>
        <p className="mt-1 opacity-90 text-sm whitespace-pre-line	font-medium">{review}</p>
      </div>
    </article>
  )
}

export default Review
