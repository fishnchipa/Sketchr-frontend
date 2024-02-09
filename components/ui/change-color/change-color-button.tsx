"use client"

import Image from 'next/image'
import React from 'react'

const ChangeColorButton = () => {
  return (
    <button className="h-[35px] w-[35px] ">
      <Image 
        src={"/color.png"} 
        alt={"change color button"} 
        width={35} 
        height={35}
        priority={true}
      />
    </button>
  )
}

export default ChangeColorButton