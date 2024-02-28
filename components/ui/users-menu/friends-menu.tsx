import React from 'react'

const FriendsMenu = () => {


  return (
    <div className="w-[242px] flex flex-col gap-y-[23px]">
      <input 
        className="w-full h-[35px] rounded-[10px]  bg-[#494949] border-[#323232] border-[1px]
        text-[12px] text-white ring-offset-background focus-visible:outline-none placeholder-white
        focus-visible:ring-0 focus-visible:ring-ring p-2 focus-visible:border-black focus-visible:placeholder-gray-500"
        placeholder="Search For User"
      />
      <h1 className="font-extrabold text-white text-[12px]">Online</h1>
      <div className="mt-[23px] flex flex-col gap-y-[10px]">

      </div>
    </div>
  )
}

export default FriendsMenu