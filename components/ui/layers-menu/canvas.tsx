"use client"

import { useAppSelector } from '@/lib/hooks';
import useCanvas from '@/lib/hooks/use-canvas';
import { CanvasRef, Point } from '@/lib/types';
import React, { ReactNode, Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { brush, cursor, eraser } from "@/lib/tools";

interface CanvasProps {
  id: string,
}



const Canvas = (({ id }: CanvasProps, ref: Ref<CanvasRef>) => {
  const selectedLayer = useAppSelector((state) => state.layerMenu.selected);
  const layer = useAppSelector((state) => state.layerMenu.layers.find(value => value.id === id));
  const tool = useAppSelector((state) => state.tools);
  const prevPoint = useRef<Point | null>(null);
  const isDrawing = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onDraw = useRef<((start: Point, end: Point | null, ctx: CanvasRenderingContext2D, size: number, opacity: number, color: string) => void)>(brush);
  const paths = useState([]);
  
  useEffect(() => {
    id === selectedLayer ? focus() : unfocus();
  }, [selectedLayer])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && layer) {
      if (layer.isHidden) {
        canvas.style.visibility = "hidden";
      } else {
        canvas.style.visibility = "visible"
      }
    }
  },[layer?.isHidden]);

  useEffect(() => {
    switch (tool.selected) {
      case 'brush':
        onDraw.current = brush;
        break;
      case 'eraser':
        onDraw.current = eraser;
        break;
      case 'cursor':
        onDraw.current = cursor;

      case 'fill':
      case 'eyedrop':
    }
  }, [tool.selected])

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


  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!isDrawing.current) { return; }

    if (canvas) {
 
      const ctx = canvas.getContext("2d");
   
      const point = computePointInCanvas(e.clientX, e.clientY);
      if (ctx) {
       
        onDraw.current(point!, prevPoint.current, ctx, tool.size, tool.opacity, tool.color.hex);
      }
      prevPoint.current = point;
    }
  }
  
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    isDrawing.current = true;

  }

  const mouseUp = () => {

    prevPoint.current = null;
    isDrawing.current = false;
  }

  const mouseLeave = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    e.preventDefault();
    const end = computePointInCanvas(e.clientX, e.clientY);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx && !isDrawing) {

        onDraw.current(prevPoint.current!, end, ctx, tool.size, tool.opacity, tool.color.hex);
      }
    }
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

  useImperativeHandle(ref, () => ({
    mouseDown,
    mouseUp,
    mouseMove,
    focus,
    unfocus
  }))

  return (
    <canvas
      className={`absolute`}
      width={1000}
      height={500}
      ref={canvasRef}
      onMouseMove={(e) => mouseMove(e)}
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={() => mouseUp()}
      onMouseLeave={(e) => mouseLeave(e)}
    />
      
  
  )
})

export default forwardRef(Canvas);