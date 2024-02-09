"use client"

import React, { useEffect, useRef, useState } from 'react'

type SliderButtonProps = {
  text: string
  increment: (width: number) => void
}

const SliderButton = ({text, increment} : SliderButtonProps) => {

  const pressed = useRef(false);
  const [width, setWidth] = useState(0);
  let percentage = 0;

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
    pressed.current = true;
    moveSlider(event);
  }


  return (
    <div
      onMouseDown={(e) => {mouseDown(e)}}
      onMouseMove={(e) => {moveSlider(e)}}
      onMouseUp={() => {pressed.current = false;}}
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
        {text}: {Math.round(((width) / 200) * 100)}
      </p>
    </div>
  )
}

export default SliderButton