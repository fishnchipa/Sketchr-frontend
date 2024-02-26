"use client"

import React, { useRef } from 'react'
import ColorWheel from './color-wheel'
import ColorDisplay from './color-display'
import ColorHex from './color-hex'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { resetColor } from '@/lib/features/localColorSlice'
import { closeModalColor } from '@/lib/features/modalColorSlice'
import { hexToRGB, hsvToHSL, hsvToRGB, rgbToHEX, rgbToHSL, rgbToHSV } from '@/lib/utils'
import { changeColor } from '@/lib/features/toolSlice'
import { ColorType } from '@/lib/types'

const ChangeColorModal = () => {
  const localColor = useAppSelector((state) => state.localColor);
  const globalColor = useAppSelector((state) => state.tools.color);
  const modal = useAppSelector((state) => state.modalColor);
  const dispatch = useAppDispatch();
  



  const handleColor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(changeColor(localColor.hsv));
    dispatch(closeModalColor())
    
  }

  const cancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const colorHSV = globalColor.hsv;
    const colorRGB = hsvToRGB(colorHSV.hue, colorHSV.saturation, colorHSV.value);
    const colorHSL = rgbToHSL(colorRGB.red, colorRGB.green, colorRGB.blue);

    const color: ColorType = {
      rgb: colorRGB,
      hsv: colorHSV,
      hsl: colorHSL
    }
    dispatch(resetColor(color));
    dispatch(closeModalColor());
   
  }
  if (modal.open) {
    return (
      <>
        <div className="w-screen h-screen fixed flex justify-center items-center bg-opacity-80 bg-black z-10">
          <div
            className="w-[500px] h-[600px] rounded-[20px] bg-[#6d6d6d] p-[25px] flex flex-col gap-y-[25px]"
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
                    onClick={(e) => {handleColor(e)}}
                    className="flex justify-center items-center w-[78px] h-[41px] rounded-[20px]
                    bg-white text-black text-[15px] font-semibold hover:bg-[#c2c2c2]"
                    >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ChangeColorModal