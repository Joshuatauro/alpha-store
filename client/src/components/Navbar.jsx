import React,  { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { checkUserLoggedIn, isLoggedIn, cart, isAdmin } = useContext(AuthContext)

  // const [isCart, setIsCart] = useState(true)

  useEffect(() => {
    checkUserLoggedIn()
    const cartCount = localStorage.getItem('cart')
    //change isCart on basis if cart is present or not

  }, [])

  return (
    <nav className="w-full bg-white border rounded-md border-gray-300 shadow-sm font-barlow">
      <div className="m-auto w-11/12 flex py-4 justify-between items-center">
        <div className="flex items-center">
        <Link to="/">
          <h1 className="text-2xl font-black py-2 px-3 h-auto bg-indigo-600 text-white rounded-md">ALPHA</h1>
        </Link>
        {
            isAdmin ? (
              <Link>
                <li className="flex items-center ml-1 py-1 px-4 bg-primary-gray">
                  <p className="font-bold text-gray-900 rounded-md text-lg uppercase">Admin</p>
                </li>
              </Link>
            ) : ""
          }
        </div>
        <ul className="flex items-center">
          <li className="relative mr-1 flex items-center">
            <p className=" font-medium uppercase text-sm">Cart</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

          {
            cart?.length > 0 ? (
              <span className="flex h-2 w-2 absolute -top-px right-px">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
            ) : ""
          }
          </li>

          {
            isLoggedIn ? (
              <> 
                <Link>
                <li className="flex items-center mx-1">
                  <p className="uppercase font-medium text-sm">Wishlist</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </li>
                </Link>
                <Link>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              </>
            ) : (
              <>
              <li>
                  <Link to="/login" className="text-header font-semibold transition-all duration-300 mx-3 hover:text-indigo-700">LOGIN</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-header font-semibold bg-primary-gray rounded-md px-5 py-3 transition-all duration-300 hover:bg-indigo-700 hover:text-white">SIGNUP</Link>
                </li>
              </>

            )
          }
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
