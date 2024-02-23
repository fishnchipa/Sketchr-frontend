"use client"

import { changeSize } from '@/lib/features/toolSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useEffect, useRef, useState } from 'react'

type SliderButtonProps = {
  text: string
  increment: (width: number) => void,
  inital: number
}

const SliderButton = ({text, increment, inital} : SliderButtonProps) => {
  const pressed = useRef(false);
  const slider = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState((Math.round((inital / 100) * 200)));
  let percentage = inital;

  const moveSlider = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const Xbounds = event.currentTarget.getBoundingClientRect().x;
    const length = Math.round(event.clientX - Xbounds + 1);
    

    if (pressed.current) {
      percentage = (Math.round(((length) / 200) * 100));
      setWidth(length)
      increment(percentage);
    }
  }

  const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (slider.current) {
      slider.current.style.cursor = "grabbing";
    }
    pressed.current = true;
    moveSlider(event);
  }

  const mouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (slider.current) {
      slider.current.style.cursor = "grab";
    }
    pressed.current = false;
  }

  return (
    <div
      ref={slider}
      onMouseDown={(e) => {mouseDown(e)}}
      onMouseMove={(e) => {moveSlider(e)}}
      onMouseUp={(e) => {mouseUp(e)}}
      onMouseLeave={() => {pressed.current = false}}
      className="w-[200px] h-[35px] rounded-[5px] bg-[#252525] cursor-grab select-none
      relative
      "
    >
      <div 
        className="bg-[#636FD7] h-[35px] absolute rounded-[5px] select-none"
        style={{width: width}}
      >
      </div>
      <p 
        className="select-none absolute text-white flex justify-center items-center
        w-[200px] h-[35px]"
        unselectable="on" 
        draggable="false" >
        {text}: {percentage}
      </p>
    </div>
  )
}

export default SliderButton