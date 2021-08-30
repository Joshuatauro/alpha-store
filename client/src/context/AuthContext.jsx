import React, { useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [wishList, setWishList] = useState([])
  const [cart, setCart] = useState([])

  const logIn = async(email, password, remember) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {email, password, remember}, {withCredentials: true})
    setIsLoggedIn(data.logUserIn)
    setName(data.name)
    setIsAdmin(data.adminLevel)
    setWishList(data.wishList || [])
    setCart(data.cart || [])
    return data.logUserIn
  }

  const signup = async(firstName, lastName, email, password, remember, rePassword) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', {email,firstName, lastName ,password,remember, rePassword}, {withCredentials: true})
    setIsLoggedIn(data.logUserIn)
    setName(data.name)
    setIsAdmin(data.adminLevel)
    setWishList(data.wishList || [])
    setCart(data.cart || [])
    return data.logUserIn
  }

  const checkUserLoggedIn = async() => {
    const { data } = await axios.get("http://localhost:5000/api/auth/auth-status", { withCredentials: true })
    console.log(data)
    if(data.isVerified){  
      setName(data.name)
      setIsAdmin(data.isAdmin)
      setIsLoggedIn(data.isVerified || [])
      setWishList(data.wishList || [])
      setCart(data.cart || [])
    }
  }



  return (
    <AuthContext.Provider value={
      {
        name, isAdmin, isLoggedIn, logIn, signup, checkUserLoggedIn, cart, wishList
      }
    }>
      {children}
    </AuthContext.Provider>
  )
} 
