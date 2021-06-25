import React,  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [isCart, setIsCart] = useState(true)

  useEffect(() => {
    const cartCount = localStorage.getItem('cart')
    //change isCart on basis if cart is present or not
  }, [])

  return (
    <nav className="w-full bg-white border rounded-md border-gray-300 shadow-sm font-barlow">
      <div className="m-auto w-11/12 flex py-4 justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-black py-2 px-3 h-auto bg-indigo-600 text-white rounded-md">ALPHA</h1>
        </Link>
        <ul className="flex items-center">
          <li className="relative mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>

          {
            isCart ? (
              <span className="flex h-3 w-3 absolute -top-1 -right-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            ) : ""
          }
          </li>
          <li>
            <Link to="/login" className="text-header font-semibold transition-all duration-300 mx-3 hover:text-indigo-700">LOGIN</Link>
          </li>
          <li>
            <Link to="/login" className="text-header font-semibold bg-primary-gray rounded-md px-5 py-3 transition-all duration-300 hover:bg-indigo-700 hover:text-white">SIGNUP</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
