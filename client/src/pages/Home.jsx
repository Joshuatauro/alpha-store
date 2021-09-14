import React from 'react'
import Testimonial from '../components/Testimonial'
import { Link } from 'react-router-dom'
const Home = () => {

  const catArray = [
    {
      name: "Gaming mouse",
      imgUrl: "1.png",
      url: "mouse"
    },
    {
      name: "GPU",
      imgUrl: "2.png",
      url: "gpu"
    },
    {
      name: "Headphones",
      imgUrl: "3.png",
      url: "headphone"
    },
    {
      name: "Keyboards",
      imgUrl: "7.png",
      url: "keyboard"
    }
  ]

  return (
    <section className="mx-auto mt-20 font-barlow ">
      <div className="w-11/12  mx-auto grid grid-cols-5">
        <div className="col-span-3">
          <h1 className="text-5xl font-black text-header">THE ONE STOP PLACE FOR ALL YOUR GAMING NEEDS.</h1>
          <p className="text-lg text-gray-700 font-medium mt-2 mb-5 w-11/12">We help you keep upto date with the market by providing you access to the latest technologies varying from mechanical keyboards, to CPU's all the way up to complete gaming kits</p>
          <div className="flex ">
            <button className="px-7 rounded-md text-white font-bold text-lg py-3 flex items-center bg-indigo-700 ">
              BROWSE
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
            <button className="px-7 ml-3 rounded-md text-header font-bold text-lg py-3 flex items-center bg-primary-gray">
              ABOUT US
            </button>
          </div>
        </div>
        <img className=" rounded-md object-contain w-full h-auto col-span-2 " src="https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" alt="" />
      </div>

      <div className="bg-indigo-700 py-10 my-20 rounded-md text-white">
        <div className="w-11/12 m-auto">

          <ul className="grid grid-cols-3 gap-5">
            <li>
                <h1 className="text-2xl font-black">SAVE TONS OF MONEY</h1>
                <p className=" text-gray-300">We know how expensive this hobby can get, we do our best to provide the latest technologies for the cheapest price possible</p>
            </li>
            <li>
                <h1 className="text-2xl font-black">EXPRESS DELIVERY</h1>
                <p className="text-gray-300">Our main goal is customer satisfaction, and one of the biggest factors in insuring that is, lightning quick deliveries</p>
            </li>
            <li>
                <h1 className="text-2xl font-black">24/7 CUSTOMER SERVICE</h1>
                <p className="text-gray-300">We are available around the clock to help you whenever you need, get quick assistance on problems you face, be it hardware or software</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white py-10 my-20 rounded-md text-header">
        <div className="w-11/12 m-auto">
          <h1 className="mb-8 uppercase text-3xl font-black">Our categories</h1>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-9">
            {
              catArray.map(({name, imgUrl, url}, index) => {
                return(
                  <li className="relative bg-indigo-700 rounded-md py-5" key="index">
                    <Link to={`/category/${url}`}>
                      <div className=" w-11/12 m-auto">
                        <img src={`/${imgUrl}`} alt="" className="absolute mt-1 -top-10 md:-top-6 h-24 lg:h-28  right-0" />
                        <h1 className="uppercase text-xl font-bold text-white">{name}</h1>
                        <Link className="uppercase text-sm font-medium text-white">Check it out</Link>
                      </div>
                    </Link>
                  </li>
                )
                })
            }
          </ul>
        </div>
      </div>

      <div className=" py-10 my-20 rounded-md text-white">
        <div className="w-11/12 m-auto">
          <h1 className="text-3xl mb-5 font-black text-header">WHAT OUR CLIENTS SAY</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <li>
              <Testimonial name="Monica" rating={5} imageURL="./profile_1.png" desc="If I had to recommend a way of getting into anything gaming related today, it would be AlphaStore without a doubt." title="It was a great experience" />
            </li>
            <li>
              <Testimonial name="Jin Yiang" rating={5} imageURL="./profile_2.png" desc="As a beginner, AlphaStore were very helpful and kind in helping me get something that was 100% suited to my liking" title="Best marketplaces for gamers" />
            </li>
            <li>
              <Testimonial name="Monica" rating={5} imageURL="./profile_1.png" desc="If I had to recommend a way of getting into anything gaming related today, it would be AlphaStore without a doubt." title="It was a great experience" />
            </li>
            <li>
              <Testimonial name="Jin Yiang" rating={5} imageURL="./profile_2.png" desc="As a beginner, AlphaStore were very helpful and kind in helping me get something that was 100% suited to my liking" title="Best marketplaces for gamers" />
            </li>
            <li>
              <Testimonial name="Monica" rating={5} imageURL="./profile_1.png" desc="If I had to recommend a way of getting into anything gaming related today, it would be AlphaStore without a doubt." title="It was a great experience" />
            </li>
            <li>
              <Testimonial name="Jin Yiang" rating={5} imageURL="./profile_2.png" desc="As a beginner, AlphaStore were very helpful and kind in helping me get something that was 100% suited to my liking" title="Best marketplaces for gamers" />
            </li>
            
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Home
