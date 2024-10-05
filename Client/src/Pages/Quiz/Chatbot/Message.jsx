import React from 'react'

export default function 
({isUser,role,message}) {
    console.log(message)
  return (
    <div className={`my-6 bg-[#121212] w-8/12 rounded-lg px-4 py-3 ${role=="assistant"?'float-start':'float-end'} `}> {message}</div>
  )
}
