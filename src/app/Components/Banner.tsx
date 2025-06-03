import React from 'react'
import Link from 'next/link';
const Banner = () => {
  return (
   <div className="bg-white">
  <section className="text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-33">
    <div className="flex items-center flex-col">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mt-10">
        JoSAA Counselling Helper
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-3xl mt-6 font-semibold">
        Let your JEE efforts pay off.
      </p>

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mt-4 font-semibold">
        Make every mark count with JoSAA Counselling Helper!
      </p>

      <div className="mt-12 sm:mt-16">
        <a
          href="/student" // Replace with your actual Google Form link
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-2xl md:text-3xl bg-blue-500 text-white font-bold rounded-xl hover:bg-white  hover:border-4 hover:border-blue-500 hover:text-blue-500 transition duration-300"
        >
          Get started
        </a>
      </div>
    </div>
  </section>
</div>


  )
}

export default Banner
