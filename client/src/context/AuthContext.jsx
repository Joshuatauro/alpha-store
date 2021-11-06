import React, { useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [wishlistLength, setWishlistLength] = useState(1)
  const [cartLength, setCartLength] = useState(0)

  const logIn = async(email, password, remember) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {email, password, remember}, {withCredentials: true})
    console.log(data)
    setIsLoggedIn(data.logUserIn)
    setName(data.name)
    setIsAdmin(data.adminLevel)
    setWishlistLength(data.wishlistLength)
    setCartLength(data.cartLength)
    return data.logUserIn
  }

  const signup = async(firstName, lastName, email, password, remember, rePassword) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', {email,firstName, lastName ,password,remember, rePassword}, {withCredentials: true})
    setIsLoggedIn(data.logUserIn)
    setName(data.name)
    setIsAdmin(data.adminLevel)
    setWishlistLength(0)
    setCartLength(0)
    return data.logUserIn
  }

  const checkUserLoggedIn = async() => {
    const { data } = await axios.get("http://localhost:5000/api/auth/auth-status", { withCredentials: true })
    console.log(data)
    if(data.isVerified){  
      setName(data.name)
      setIsAdmin(data.isAdmin)
      setIsLoggedIn(data.isVerified || [])
      setWishlistLength(data.wishlistLength)
      setCartLength(data.cartLength)
    }
  }



  return (
    <AuthContext.Provider value={
      {
        name, isAdmin, isLoggedIn, logIn, signup, checkUserLoggedIn, cartLength, wishlistLength, setCartLength, setWishlistLength
      }
    }>
      {children}
    </AuthContext.Provider>
  )
} 
