import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import '../App.css'


const SignUp= () => {
  const history = useHistory()
  const { signup } = useContext(AuthContext)

  const [viewing, isViewing] = useState(false)
  const [reViewing, isReViewing] = useState(false)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [remember, setRemember] = useState(false)

  const [errors, setErrors] = useState()

  const [loading, setLoading] = useState(false)

  const handleSignupSubmit = async(e) => {
    setErrors(null)
    setLoading(true)
    e.preventDefault()
    try{
      const logUserIn = await signup(firstName, lastName, email, password, remember, rePassword)
      if(logUserIn){
        setLoading(false)
        history.push('/')
      }
    } catch(err) {
      setLoading(false)
      if(err.response.data.message === 'duplicate key value violates unique constraint "users_email_key"')
      setErrors('An account with entered email id already exists')

    }
  }

  return (
    <section className="w-full">
      <div className="w-5/12  m-auto font-barlow my-6">
        <h1 className="text-3xl font-black text-header uppercase">Sign Up</h1>
        <p className="font-medium text-md text-gray-600">Get the best ecommerce shopping experience that you could ever dream of</p>
        <form action="" className="mt-5 grid gap-3" onSubmit={handleSignupSubmit}>
          <div className="relative">
            <input value={email} onChange={e => setEmail(e.target.value)} required type="text" name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main" htmlFor="email" className=" main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs">EMAIL</label>
          </div>
          <div className="relative">
            <input value={firstName} onChange={e => setFirstName(e.target.value)} required type="text" name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main" htmlFor="email" className="  main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs uppercase">first name</label>
          </div>
          <div className="relative">
            <input value={lastName} onChange={e => setLastName(e.target.value)} required type="text" name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main" htmlFor="email" className="  main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs uppercase">last name</label>
          </div>
          <div className="relative ">
            <input value={password} onChange={e => setPassword(e.target.value)} required type={viewing ? "text" : "password"} name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main" htmlFor="email" className="  main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs uppercase">Password</label>
            <div typeof="button" onClick={() => isViewing(prev => !prev)}>
              {
                viewing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-3  top-6 mb-0.5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-3  top-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              }
            </div>
          </div>
          <div className="relative ">
            <input value={rePassword} onChange={e => setRePassword(e.target.value)} required type={reViewing ? "text" : "password"} name="email" id="input" className="pt-3 h-16 w-full focus:outline-none px-3 font-semibold bg-primary-gray text-sm rounded-md" />
            <label id="main" htmlFor="email" className="  main-label text-header absolute left-3  top-6 mb-0.5 font-extrabold text-xs uppercase">re enter Password</label>
            <div typeof="button" onClick={() => isReViewing(prev => !prev)}>
            {
                reViewing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-3  top-6 mb-0.5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-3  top-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              }
            </div>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" size="5-10 w-10" checked={remember} onChange={e => setRemember(e.target.checked)}/>
            <p htmlFor="" className="text-xs ml-1 mb-0.5 font-semibold uppercase text-gray-700">Remember Me?</p>
          </div>
          {
          errors ? <h1 className="text-sm bg-red-500 text-white font-medium px-2 py-2">{errors}</h1> : ""
          }
          {
            loading ? (
              <div className="bg-indigo-700 w-full h-12 text-white cursor-not-allowed font-bold rounded-md flex justify-center items-center uppercase"><AiOutlineLoading3Quarters className="animate-spin mr-2" /> Confirming.... </div>
            ) : (
              <button type="submit" className="bg-indigo-700 w-full h-12 text-white font-bold rounded-md">LETS GO</button>
            )
          }        
          </form>
      </div>
    </section>
  )
}

export default SignUp
