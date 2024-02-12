"use client"

import React, { useRef } from 'react'
import ColorWheel from './color-wheel'
import ColorDisplay from './color-display'
import ColorHex from './color-hex'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setGlobalColor } from '@/lib/features/globalColorSlice'
import { resetColor } from '@/lib/features/localColorSlice'
import { openModalColor } from '@/lib/features/modalColorSlice'

const ChangeColorModal = () => {
  const localColor = useAppSelector((state) => state.localColor);
  const globalColor = useAppSelector((state) => state.globalColor);
  const dispatch = useAppDispatch();
  



  const changeColor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setGlobalColor(localColor));
    dispatch(openModalColor(false))
    
  }

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(resetColor(globalColor));
    dispatch(openModalColor(false));
   
  }

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
          />
        </div>
        <div className="flex flex-row gap-x-[25px]">
          <ColorDisplay />
          <div className="flex flex-col gap-y-[25px]">
            <ColorHex />
            <div className="flex flex-row gap-x-[4px]">
              <button 
                onClick={(e) => {cancel(e)}}
                className="flex justify-center items-center w-[78px] h-[41px] rounded-[20px] 
                bg-white text-black text-[15px] font-semibold hover:bg-[#c2c2c2]"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => {changeColor(e)}}
                className="flex justify-center items-center w-[78px] h-[41px] rounded-[20px]
                bg-white text-black text-[15px] font-semibold hover:bg-[#c2c2c2]"
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