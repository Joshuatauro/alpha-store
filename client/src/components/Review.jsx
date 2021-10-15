import React from 'react'

const Review = ({name, title, review, rating}) => {
  return (
    <article className="w-full py-4 rounded-md border-2 transition-all duration-200 border-indigo-700 text-header hover:text-white hover:bg-indigo-700">
      <div className="w-11/12 m-auto">
        <h1 className="font-semibold text-md uppercase ">"{title}"</h1>
        <span className="opacity-95 text-xs  italic">
          ~ {name}
        </span>
        <p className="mt-1 opacity-90 text-sm whitespace-pre-line	font-medium">{review}</p>
      </div>
    </article>
  )
}

export default Review
