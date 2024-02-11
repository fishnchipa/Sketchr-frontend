"use client"


import React, { useEffect } from 'react'
import ColorWheel from './color-wheel'
import ColorDisplay from './color-display'
import ColorHex from './color-hex'

const ChangeColorModal = () => {

  

  return (
    <>
      <div
        className="w-[500px] h-[600px] rounded-[20px] bg-[#494949] p-[25px] flex flex-col gap-y-[25px]"
      >
        <div className="w-[450px] h-[350px] flex justify-center items-center bg-[#9B9B9B] rounded-[20px]">
          <ColorWheel 
            size={325} 
            radius={149} 
            thickness={26} 
            className={"w-450px h-350px"}
          />
        </div>
        <div className="flex flex-row gap-x-[25px]">
          <ColorDisplay />
          <div className="flex flex-col gap-y-[25px]">
            <ColorHex />
            <div className="flex flex-row gap-x-[4px]">
              <button 
                className="flex justify-center items-center w-[78px] h-[41px] rounded-[20px] bg-white text-black text-[15px]
                font-semibold hover:bg-[#c2c2c2]"
              >
                Cancel
              </button>
              <button 
                className="flex justify-center items-center w-[78px] h-[41px] rounded-[20px] bg-white text-black text-[15px]
                font-semibold hover:bg-[#c2c2c2]"
                >
                Ok
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ChangeColorModal