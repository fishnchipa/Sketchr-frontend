"use client"

import { changeHue, hsvChangeSV } from '@/lib/features/localColorSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { squareType } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'


type ColorWheelProps = {
  size: number,
  radius: number
  thickness: number
}


const ColorWheel = ({size, radius, thickness}: ColorWheelProps) => {

  // Global States

  const color = useAppSelector((state) => state.localColor);
  const dispatch = useAppDispatch();

  // Local States
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const svSquareRef = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);
  const [pressedHue, setPressedHue] = useState(false);
  const [pressedSV, setPressedSV] = useState(false);




  const drawWheel = (ctx: CanvasRenderingContext2D) => {
    const hsl = color.hsl;

    for (var i = 0; i < 360; i++) {
      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.arc(size/2, size/2, radius, (i - 90.7) * Math.PI / 180, (i - 89.3) * Math.PI / 180);
      ctx.strokeStyle = "hsl(" + i + "," + hsl.saturation*100 + "%," + hsl.lightness*100 + "%)"
      ctx.stroke();
    }
    
  }

  const drawSquare = (ctx: CanvasRenderingContext2D) => {
    const square = svSquareRef.current;

    if (square) {
      const hue = color.hsv.hue;
      const length = square.width;
      const valueGradient = ctx.createLinearGradient(0, 0, 0, length);
      const saturationGradient = ctx.createLinearGradient(0, 0, length, 0);
      valueGradient.addColorStop(0, 'white');
      valueGradient.addColorStop(1, 'black');
      saturationGradient.addColorStop(0, 'hsla(' + hue + ',100%,50%,0)');
      saturationGradient.addColorStop(1, 'hsla(' + hue + ',100%,50%,1)');
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, length, length);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, length, length);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  useEffect(() => {
    const wheel = wheelRef.current;
    const square = svSquareRef.current;
    if (wheel && square) {
      const wheelCtx = wheel.getContext("2d");
      const squareCtx = square.getContext("2d");
      if (wheelCtx) {
        wheelCtx.imageSmoothingEnabled = false;
        drawWheel(wheelCtx);
      }

      if (squareCtx) {
        squareCtx.imageSmoothingEnabled = false;
        drawSquare(squareCtx);
      }
    }
  }, [color.hsv.hue, color.hsv.saturation, color.hsv.value])
  


  const onDragStart = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    
    const x1 = e.clientX;
    const y1 = e.clientY;
    
    const bounds = e.currentTarget.getBoundingClientRect()
    const centerX = bounds.x + (e.currentTarget.offsetWidth / 2 );
    const centerY = bounds.y + (e.currentTarget.offsetHeight / 2);
   
    const inSquare = inSV(x1, y1, centerX, centerY);

    (inSquare.in) ? setPressedSV(true) : setPressedHue(true);
  }

  const onDragEnd = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    
    if (pressedHue) {
      setPressedHue(prev => !prev);
    } else if (pressedSV) {
      setPressedSV(prev => !prev);
    }

  }

  const onDragMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    e.preventDefault();
    const x1 = e.clientX;
    const y1 = e.clientY;
    const bounds = e.currentTarget.getBoundingClientRect()
    const centerX = bounds.x + (e.currentTarget.offsetWidth / 2 );
    const centerY = bounds.y + (e.currentTarget.offsetHeight / 2);
    
    const square = inSV(x1, y1, centerX, centerY);

    if (pressedHue) {
     
      const a = centerX;
      const b = centerY;     

      const m = (e.clientY - b)/ (e.clientX - a);
      const det = radius*Math.sqrt(m*m + 1)

      // Shortest distance on circle to point
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
        
      } else if (x1 < a && y1 < b){
        x = (a + a*m*m - det) / (1 + m*m)
        y = -Math.sqrt(radius*radius - (x-a)*(x-a)) + b;
        
      } else {
        x = a;
        (y1 > centerY) ? y = b + radius  : y = b - radius;
       
      }
      
      const hue = hueRef.current;
      if (hue) {
        calculateHue(x, y, centerX, centerY);
        hue.style.left = (x - (thickness / 2) - bounds.x) + "px";
        hue.style.top = (y - (thickness / 2) - bounds.y) + "px";
      }

    } else if (pressedSV) {
      
      const sv = svRef.current;
      if (sv) {
        if (x1 > square.right &&  y1 > square.bottom) {
          sv.style.left = (square.right - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.bottom - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.right, square.bottom, square);

        } else if (x1 > square.right &&  y1 < square.top) {
          sv.style.left = (square.right - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.top - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.right, square.top, square);

        } else if (x1 < square.left &&  y1 < square.top) {
          sv.style.left = (square.left - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.top - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.left, square.top, square);

        } else if (x1 < square.left && y1 > square.bottom) {
          sv.style.left = (square.left - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.bottom - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.left, square.bottom, square);

        } else if (x1 > square.right) {
          sv.style.left = (square.right - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (y1 - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.right, y1, square);

        } else if (x1 < square.left) {
          sv.style.left = (square.left - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (y1 - (thickness / 2) - bounds.y) + "px";
          calculateSV(square.left, y1, square);

        } else if (y1 > square.bottom) {
          sv.style.left = (x1 - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.bottom - (thickness / 2) - bounds.y) + "px";
          calculateSV(x1, square.bottom, square);

        } else if (y1 < square.top) {
          sv.style.left = (x1 - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (square.top - (thickness / 2) - bounds.y) + "px";
          calculateSV(x1, square.top, square);

        } else {
          sv.style.left = (x1 - (thickness / 2) - bounds.x) + "px";
          sv.style.top = (y1 - (thickness / 2) - bounds.y) + "px";
          calculateSV(x1, y1, square);

        }
      }
    }
  }

  const inSV = (x: number, y: number, offsetX: number, offsetY: number): squareType => {

    const innerRadius = (radius - (thickness / 2)) * Math.sqrt(2); 
    const svSize = innerRadius / 2;
    const right =  offsetX + svSize;
    const left = offsetX - svSize;
    const top = offsetY - svSize;
    const bottom = offsetY + svSize;

    const retVal = {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    }

    return (x > left && x < right && y < bottom && y > top ) ? {...retVal, in: true} : {...retVal, in: false}
  }

  const calculateSV = (x: number, y:number, square: squareType) => {

    const saturation = (((x - square.left) / (square.right - square.left)));
    const value = 1 - ((y - square.top) / (square.bottom - square.top));
    
    dispatch(hsvChangeSV({s: saturation, v: value}));
  }

  const calculateHue = (x: number, y: number, centerX: number, centerY: number) => {

    const verticalPointX = centerX;
    const verticalPointY = centerY - radius;
    const huePointX = x;
    const huePointY = y;
  
    // Cosine Rule
    const c = Math.sqrt(Math.pow((verticalPointX - huePointX), 2) + Math.pow((verticalPointY - huePointY), 2));
    let cosHue = (2*radius*radius - c*c) / (2*radius*radius);
    if (x < centerX) {
      cosHue = cosHue * -1;
    }
  
    // Ensure value is in correct quadrant
    let hue = Math.acos(cosHue) * 180 / Math.PI;
    if (x < centerX) {
      hue = hue + 180;
    }
  
    dispatch(changeHue({h: hue}));
    
  }

  return (
    <div className={cn("flex justify-center items-center relative rounded-[20px] w-fit h-fit")}>
      <canvas 
          ref={wheelRef} 
          width={size}
          height={size}
          onMouseDown={(e) => {onDragStart(e)}}	
          onMouseMove={(e) => {onDragMove(e)}}
          onMouseUp={(e) => {onDragEnd(e)}}
          onMouseLeave={(e) => {onDragEnd(e)}}
        />
        <div
          className="border-[2px] border-black ring-1 ring-offset-white absolute rounded-full pointer-events-none bg-transparent
          "
          ref={hueRef}
          style={{width: thickness, height: thickness}}
        ></div>
        <canvas 
          ref={svSquareRef}
          width={ (radius - (thickness / 2)) * Math.sqrt(2) }
          height={ (radius - (thickness / 2)) * Math.sqrt(2) }
          className="absolute pointer-events-none top-0 bottom-0 left-0 right-0 m-auto"
        />
        <div
          className="border-[2px] border-black ring-1 ring-offset-white absolute rounded-full pointer-events-none bg-transparent "
          ref={svRef}
          style={{width: thickness, height: thickness}}
        ></div>
    </div>
 
  )
}

export default ColorWheel