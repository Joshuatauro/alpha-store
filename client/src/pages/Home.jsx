import React from 'react'
import Testimonial from '../components/Testimonial'

const Home = () => {
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
        <img className=" rounded-md object-contain w-full h-auto col-span-2 " src="https://images.unsplash.com/photo-1544652478-6653e09f18a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" alt="" />
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

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <li className="w-full">
              <article className=" mx-auto rounded-t-md w-full shadow-lg bg-indigo-700 cursor-pointer">
                <img className="object-cover rounded-t-lg w-full h-56" src="https://images.unsplash.com/photo-1562819606-b7a0ebd7e7c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" />
                <div className="py-5 text-center ">
                    <span className="text-lg text-white font-bold uppercase">Mechanical Keyboards</span>
                </div>
              </article>
            </li>
            <li  className="w-full">
              <article className="w-full  mx-auto rounded-t-md shadow-lg bg-indigo-700  cursor-pointer">
                <img className="object-cover rounded-t-md w-full h-56" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" />
                <div className="py-5 text-center">
                    <span className="text-lg text-white font-bold uppercase">CPU</span>
                </div>
              </article>
            </li>
            <li className="w-full">
              <article className="w-full mx-auto rounded-t-md shadow-lg bg-indigo-700 cursor-pointer">
                <img className="object-cover rounded-t-md w-full h-56" src="https://images.unsplash.com/photo-1590410413989-335162b01314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" />
                <div className="py-5 text-center">
                    <span className="text-lg text-white font-bold uppercase">Monitors</span>
                </div>
              </article>
            </li>
            <li className="w-full">
              <article className=" mx-auto rounded-t-md w-full shadow-lg bg-indigo-700 cursor-pointer">
                <img className="object-cover rounded-t-lg w-full h-56" src="https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="avatar" />
                <div className="py-5 text-center ">
                    <span className="text-lg text-white font-bold uppercase">Gaming mouse</span>
                </div>
              </article>
            </li>
            <li  className="w-full">
              <article className="w-full  mx-auto rounded-t-md shadow-lg bg-indigo-700 cursor-pointer">
                <img className="object-cover rounded-t-md w-full h-56" src="https://images.unsplash.com/photo-1581432079854-2f6d5678b478?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="avatar" />
                <div className="py-5 text-center">
                    <span className="text-lg text-white font-bold uppercase">Gaming Headphones</span>
                </div>
              </article>
            </li>
            <li className="w-full">
              <article className="w-full mx-auto rounded-t-md shadow-lg bg-indigo-700 cursor-pointer">
                <img className="object-cover rounded-t-md w-full h-56" src="https://images.unsplash.com/photo-1595044537698-6edf5d4f133e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" />
                <div className="py-5 text-center">
                    <span className="text-lg text-white font-bold uppercase">Keycaps</span>
                </div>
              </article>
            </li>
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
