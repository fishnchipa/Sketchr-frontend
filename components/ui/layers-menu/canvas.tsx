"use client"

import useCanvas from '@/lib/hooks/use-canvas';
import React, { useEffect, useRef } from 'react'




const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  
  const computePointInCanvas = (clientX: number, clientY: number) => {
    if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
            x: clientX - boundingRect.left,
            y: clientY - boundingRect.top
        }
    } else {
        return null;
    }
  }


  const moveMouse = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (canvas) {
      
    }
  }
  



  return (
    <canvas
       className="bg-red-500 "
       ref={canvasRef}
      onMouseMove={(e) => {moveMouse(e)}}
    />
      
  
  )
}

export default Canvas