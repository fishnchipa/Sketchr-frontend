"use client"

import React, { useEffect, useRef, useState } from 'react'

type ColorWheelProps = {
  size: number
  radius: number
  thickness: number
}

const ColorWheel = ({size, radius, thickness}: ColorWheelProps) => {

  const wheelRef = useRef<HTMLCanvasElement>(null);
  const svSquareRef = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);


  const drawWheel = (ctx: CanvasRenderingContext2D) => {
    for (var i = 0; i < 360; i++) {
      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.arc(size/2, size/2, radius, (i - 90.7) * Math.PI / 180, (i - 89.3) * Math.PI / 180);
      ctx.strokeStyle = 'hsl(' + i + ',100%,50%)';
      ctx.stroke();
    }
  }

  const drawSquare = (ctx: CanvasRenderingContext2D) => {
    const square = svSquareRef.current;

    if (square) {
      const length = square.width;
      const valueGradient = ctx.createLinearGradient(0, 0, 0, length);
      const saturationGradient = ctx.createLinearGradient(0, 0, length, 0);
      valueGradient.addColorStop(0, 'white');
      valueGradient.addColorStop(1, 'black');
      saturationGradient.addColorStop(0, 'hsla(27,100%,50%,0)');
      saturationGradient.addColorStop(1, 'hsla(27,100%,50%,1)');
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, length, length);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, length, length);
      ctx.globalCompositeOperation = "source-over";
    }

  }

  const hsvToRGB = (value: number, saturation: number, hue: number) => {
    let chroma = value * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1- Math.abs((hue1 % 2) - 1));
    let r1, g1, b1;
    if (hue1 >= 0 && hue1 <= 1) {
      ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
      ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
      ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
      ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
      ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
      ([r1, g1, b1] = [chroma, 0, x]);
    } else {
      ([r1, g1, b1] = [0, 0, 0]);
    }
    
    let m = value - chroma;
    let [r,g,b] = [r1+m, g1+m, b1+m];
    
    // Change r,g,b values from [0,1] to [0,255]
    return [255*r,255*g,255*b];
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
  }, [])
  
  const onDragStart = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    setPressed(true);
    
  }

  const onDragEnd = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    setPressed(false)
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

  const updateHSV = () => {

  }

  return (
    <>
      <canvas 
        ref={wheelRef} 
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
      ></div>
      <canvas 
        ref={svSquareRef}
        width={200}
        height={200}
        className="absolute"
      />

    </>
  )
}

export default ColorWheel