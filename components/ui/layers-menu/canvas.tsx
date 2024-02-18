"use client"

import useCanvas from '@/lib/hooks/use-canvas';
import { Point } from '@/lib/types';
import React, { useEffect, useRef } from 'react'




const Canvas = () => {
  
  const prevPoint = useRef<Point | null>(null);
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  
  const onDraw = (start: Point, end: Point | null, ctx: CanvasRenderingContext2D) => {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(start.x, start.y);
    if (end) {
      ctx.lineTo(end.x, end.y);
    }
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

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
    e.preventDefault();
    if (!isDrawing.current) { return; }

    if (canvas) {
      const ctx = canvas.getContext("2d");
   
      const point = computePointInCanvas(e.clientX, e.clientY);
      if (ctx) {
        onDraw(point!, prevPoint.current, ctx);
      }
      prevPoint.current = point;
    }
  }
  
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    isDrawing.current = true;

  }

  const mouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    prevPoint.current = null;
    isDrawing.current = false;
  }


  return (
    <canvas
      className="border-[1px] border-black"
      width={500}
      height={500}
      ref={canvasRef}
      onMouseMove={(e) => moveMouse(e)}
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={(e) => mouseUp(e)}
    />
      
  
  )
}

export default Canvas