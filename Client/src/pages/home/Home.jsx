import React from 'react'
import Hero from './FirstSection/Hero'
import Blogs from './blog/Blogs'

const Home = () => {
  return (
    <div className='bg-gray-100 text-black mt-5 container mx-auto p-8'>
      <div><Hero/></div>
      <div><Blogs/></div>
      
    </div>
  )
}

export default Home
