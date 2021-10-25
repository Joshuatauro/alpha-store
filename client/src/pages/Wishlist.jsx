import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import WishlistItem from '../components/WishlistItem'
import { AuthContext } from '../context/AuthContext'


const Wishlist = () => {
  const { setWishListLength } = useContext(AuthContext)

  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const getWishlistItems = async() => {
      const { data } = await axios.get('http://localhost:5000/api/users/wishlist', { withCredentials: true })
      setWishlist(data.wishlist)
    }
    getWishlistItems()
  }, [])

  const addToCart = async(productObject, id) => {
    removeFromWishlist(id)
    const { data } = await axios.post('http://localhost:5000/api/actions/add-to-cart', {productDetails: productObject, quantity: 1}, {withCredentials: true})
    
  }

  const removeFromWishlist = async(id) => {     
    const {data} = await axios.post(`http://localhost:5000/api/actions/remove-from-wishlist`, {indexPosition: id} , {withCredentials: true})
    setWishlist(data.updatedWishlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  }


  return (
    <section className="w-11/12 m-auto">
      <h1 className="uppercase text-3xl font-black text-header border-b-4 border-indigo-700 max-w-min">WISHLIST</h1>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {
          wishlist?.map(({category, is_sale, name, price, sale_price, url}, index) => <WishlistItem name={name} category={category} onSale={is_sale} price={price} salePrice={sale_price} url={url} dataKey={index} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />)
        }
      </div>
    </section>
  )
}


export default Wishlist
