import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import '../App.css'
import { AuthContext } from '../context/AuthContext'
const Login= () => {
  const history = useHistory()
  const { logIn } = useContext(AuthContext)
  const [viewing, isViewing] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const [loading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState()

  const handleLoginSubmit = async(e) => {
    setErrors(null)
    setIsLoading(true)
    e.preventDefault()
    try{
      const logUserIn = await logIn(email, password, remember)

      if(logUserIn){
        setIsLoading(false)
        history.push('/')
      }
    } catch(err) {
      setIsLoading(false)
      setErrors(err.response.data.message)

    }
  }

  return (
    <section className="w-full">
      <div className="w-5/12 mt-20  m-auto font-barlow">
        <h1 className="text-3xl font-black text-header uppercase">Log In</h1>
        <p className="font-medium text-md text-gray-600">Get the best ecommerce shopping experience that you could ever dream of</p>
        <form action="" className="mt-5" onSubmit={handleLoginSubmit}>
          <div className="relative">
            <input value={email} onChange={e => setEmail(e.target.value)} required type="text" name="email" id="input" className="pt-3 h-12 w-full focus:outline-none px-3 font-bold font-barlow text-sm bg-primary-gray rounded-md" />
            <label id="main" htmlFor="email" className=" main-label text-header absolute left-3 top-3 mt-0.5 font-extrabold text-sm">EMAIL</label>
          </div>
          <div className="relative my-2">
            <input value={password} onChange={e => setPassword(e.target.value)} required type={viewing ? "text" : "password"} name="email" id="input" className="pt-3 h-12 w-full focus:outline-none px-3 font-bold font-barlow text-sm bg-primary-gray rounded-md" />
            <label id="main" htmlFor="email" className=" main-label text-header absolute left-3 top-3 mt-0.5 font-extrabold text-sm uppercase">Password</label>
            <div typeof="button" onClick={() => isViewing(prev => !prev)}>
              {
                viewing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-2 top-3 mt-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 cursor-pointer w-4 absolute right-2 top-3 mt-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            errors ? <h1 className="text-sm bg-red-500 text-white font-medium px-2 mb-1 rounded-md py-2">{errors}</h1> : ""
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

export default Login
