import React, { useState, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const logIn = async(email, password, remember) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {email, password, remember}, {withCredentials: true})
    setIsLoggedIn(data.logUserIn)
    setName(data.firstName+ " " + data.lastName)
    setIsAdmin(data.isAdmin)
    return data.logUserIn
  }

  const signup = async(firstName, lastName, email, password, remember, rePassword) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/signup', {email,firstName, lastName ,password,remember, rePassword}, {withCredentials: true})
    setIsLoggedIn(data.logUserIn)
    setName(data.firstName+ " " + data.lastName)
    setIsAdmin(data.isAdmin)
    return data.logUserIn
  }

  const checkUserLoggedIn = () => {
    
  }



  return (
    <AuthContext.Provider value={
      {
        name, isAdmin, isLoggedIn, logIn, signup
      }
    }>
      {children}
    </AuthContext.Provider>
  )
} 
