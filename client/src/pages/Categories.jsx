import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Category = () => {
  const { categoryName } = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const getAllProducts = async() => {
      const { data } = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`)
      setProducts(data.products)
      console.log(data)
    }
    getAllProducts()
  }, [])

  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-min">{categoryName}</h1>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {
          products.map(({title, desc, sale, salePrice, category, price, _id, imgUrl, reviews}) => (
            <ProductPreview key={_id} title={title} desc={desc} imgUrl={imgUrl} sale={sale} reviews={reviews.length > 0 ? reviews : null} category={category} price={price} salePrice={salePrice} />
          ))
        }
      </div>
    </section>
  )
}

const ProductPreview = ({title, price, imgUrl, sale, category, salePrice, _id, reviews}) => {
  const totalRating = reviews?.map(({rating}) => rating).reduce((a,b) => a+b)
  const rating = totalRating/reviews?.length

  return (
    <article  className="border-2 rounded-md relative border-indigo-700 shadow-sm text-header">
      <Link>
      <div className="py-3 w-11/12 m-auto flex flex-col">
        <div className=" flex items-center justify-center h-44">
          <img src={imgUrl} alt="" className='object-contain w-full h-auto ' />
        </div>
        <span className="uppercase text-tiny font-medium bg-indigo-700 text-white h-full max-w-min px-2 py-1 rounded-sm">{category}</span>
        <div className="flex">
          <h1 className="uppercase font-bold">{title}</h1>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-extrabold ">${price}</span>
        {
          !isNaN(rating) && (<span>{rating}</span>)
        }
        </div>
      </div>
      <Link className="bg-indigo-700 absolute rounded-full -right-2 -bottom-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white p-3 bg-indigo-700 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
      </Link>
      </Link>
    </article>
  )
}

export default Category
