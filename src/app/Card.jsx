



import React from 'react'

const Card = ({index}) => {
  return (
    <div >

      <div className='text-center shadow-lg'>
       <div className='overflow-hidden'>
       <img src={index.url} className='hover:scale-125 duration-1000' />
       </div>
        <h3 className='font-bold text-2xl'>{index.title}</h3>
        <p>Rs 8000</p>
      </div>

    </div>
  )
}

export default Card
