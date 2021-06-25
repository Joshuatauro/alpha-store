import React from 'react'

const Testimonial = ({imageURL, name, rating, desc, title}) => {
  return (
    <article className="w-full py-3 rounded-md bg-white border-2 text-header shadow-md transition-all duration-300 border-indigo-700 hover:bg-indigo-700 hover:text-white">
      <div className="w-11/12 m-auto">
        <div className="flex items-center">
          <img src={imageURL} alt="" className="h-12 w-12 mr-3 " />
          <div className="flex flex-col">
            <h1 className="font-bold uppercase text-lg">"{title}"</h1>
            <p className="font-semibold text-sm">~ {name}</p>
          </div>
        </div>
            <p className="text-opacity-90 mt-3 font-medium">{desc}</p>
      </div>
    </article>
  )
}

export default Testimonial
