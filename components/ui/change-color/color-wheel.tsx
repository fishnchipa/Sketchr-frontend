"use client"

import React, { useEffect, useRef, useState } from 'react'

type ColorWheelProps = {
  size: number
  radius: number
  thickness: number
}

const ColorWheel = ({size, radius, thickness}: ColorWheelProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);


  const draw = (ctx: CanvasRenderingContext2D) => {
    for (var i = 0; i < 360; i++) {
      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.arc(size/2, size/2, radius, (i - 90.7) * Math.PI / 180, (i - 89.3) * Math.PI / 180);
      ctx.strokeStyle = 'hsl(' + i + ',100%,50%)';
      ctx.stroke();
    }
  }

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        draw(ctx);
      }
    }
  }, [])
  
  const onDragStart = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    setPressed(true);
    
  }

  const onDragMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    e.preventDefault();
    if (pressed) {
      const a = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (thickness / 2);
      const b = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight / 2) - (thickness / 2);

      const x1 = e.clientX;
      const y1 = e.clientY;

      const m = (e.clientY - b)/ (e.clientX - a);
      const det = radius*Math.sqrt(m*m + 1)

      let x, y;
      if (x1 > a && y1 > b) {
        x = (a + a*m*m + det) / (1 + m*m) 
        y = Math.sqrt(radius*radius - (x-a)*(x-a)) + b ;
      } else if (x1 < a && y1 > b) {
        x = (a + a*m*m - det) / (1 + m*m)
        y = Math.sqrt(radius*radius - (x-a)*(x-a)) + b;
      } else if (x1 > a && y1 < b) {
        x = (a + a*m*m + det) / (1 + m*m)
        y = -Math.sqrt(radius*radius - (x-a)*(x-a)) + b;
      } else {
        x = (a + a*m*m - det) / (1 + m*m)
        y = -Math.sqrt(radius*radius - (x-a)*(x-a)) + b;
      }


      const hue = hueRef.current;
      
      if (hue) {
        hue.style.left = (x) + "px";
        hue.style.top = (y) + "px";
      }

   
    }

  }

  const onDragEnd = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setPressed(false)
  }

  return (
    <>
      <canvas 
        ref={canvasRef} 
        width={size}
        height={size} 
        className="bg-red-500"
        onMouseDown={(e) => {onDragStart(e)}}	
        onMouseMove={(e) => {onDragMove(e)}}
        onMouseUp={(e) => {onDragEnd(e)}}
      />
      <div
        className="border-[2px] border-black ring-1 ring-offset-white absolute rounded-full pointer-events-none bg-transparent"
        ref={hueRef}
        style={{width: thickness, height: thickness}}
      >

      </div>
    </>
  )
}

export default ColorWheel