"use client"

import { useAppSelector } from '@/lib/hooks';
import useCanvas from '@/lib/hooks/use-canvas';
import { CanvasRef, Point } from '@/lib/types';
import React, { ReactNode, Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface CanvasProps {
  id: number,
}

const Canvas = (({ id }: CanvasProps) => {
  const selectedLayer = useAppSelector((state) => state.layerMenu.selected);
  const isHidden = useAppSelector((state) => state.layerMenu.isHidden[id]);
  const prevPoint = useRef<Point | null>(null);
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    id == selectedLayer ? focus() : unfocus();
  }, [selectedLayer])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (isHidden) {
        canvas.style.visibility = "hidden";
      } else {
        canvas.style.visibility = "visible"
      }
    }
  },[isHidden]);

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
    const canvas = canvasRef.current;
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

  const mouseLeave = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    prevPoint.current = null;
  }

  const focus = () => {
    if (canvasRef.current) {
      canvasRef.current.style.zIndex = "1"
    }
  }

  const unfocus = () => {
    if (canvasRef.current) {
      canvasRef.current.style.zIndex = "0"
    }
  }


  const getData = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        return ctx.getImageData(0,0,1000,500).data;
      }

    }
  }

  const debug = () => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      console.log(ctx.getImageData(0, 0, 1000, 500).data);
    }
  }

  return (
    <canvas
      className={`absolute`}
      width={1000}
      height={500}
      ref={canvasRef}
      onMouseMove={(e) => moveMouse(e)}
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={(e) => mouseUp(e)}
      onMouseLeave={(e) => mouseLeave(e)}
    />
      
  
  )
})

export default Canvas;