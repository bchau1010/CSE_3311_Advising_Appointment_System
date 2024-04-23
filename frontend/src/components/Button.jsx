import React from 'react'


const Button = (props) => {
  return (
    <button className='bg-black text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-white-700 hover:text-black-500 
    duration-500'>
      {props.children}
    </button>
  )
}


export default Button