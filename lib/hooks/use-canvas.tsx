
import React, { useEffect, useRef } from 'react'
import { Point } from '@/lib/types';


const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef<Point>(null);

  const setCanvas = (ref: HTMLCanvasElement) => {
    canvasRef.current = ref;
  }

  useEffect(() => {
    const calculatePointInCanvas = (clientX: number, clientY: number) => {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.x,
          y: clientY - boundingRect.y
        }
      } else {
        return null;
      }
    }




  })

  return {
    setCanvas
  }
}


export default useCanvas;