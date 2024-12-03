



import React from 'react'

const Buttons = ({colors,filterItems,setData}) => {
  return (
    <div className='flex justify-center'>
      {
            colors.map((val,id)=>(
                <button key={id} className='bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-800 m-2' onClick={()=>filterItems(val)}>{val}</button>
            ))
      }

    </div>
  )
}

export default Buttons
