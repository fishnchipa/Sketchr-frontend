"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { VSeparator } from '../separator';
import CanvasLayer from './canvas-layer';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeLayer, changeVisibility } from '@/lib/features/layersMenuSlice';

type LayerProps = {
  id: number
  name: string,
  isSelected: boolean
}

const Layer = ({id, name, isSelected}: LayerProps) => {
  const menu = useAppSelector((state) => state.layerMenu);
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null); 
  const isDragging = useRef(false);

  const changeHidden = () => {
    setHidden(prev => !prev);
    dispatch(changeVisibility(id));

    const nextLayerIndex = menu.layers.findIndex((value) => value === id);
    if (nextLayerIndex !== 0) {
      dispatch(changeLayer(nextLayerIndex));
    }
  }

  const switchLayer = () => {
    dispatch(changeLayer(id));

  }

  const changePositionAbsolute = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }
    
    layerRef.current.style.position = "absolute";
  }

  const changePositionStatic = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }

    layerRef.current.style.position = "static";
    layerRef.current.style.left = "0px"
  }

  const moveDraggable = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }
    const bound = e.currentTarget.getBoundingClientRect();
    console.log(e.clientY - bound.y + e.currentTarget.offsetTop - 25);
    layerRef.current.style.left = (e.clientX - bound.x + e.currentTarget.offsetLeft - (e.currentTarget.offsetWidth/2)) + "px";
    layerRef.current.style.top = (e.clientY - bound.y + e.currentTarget.offsetTop - e.currentTarget.offsetHeight/2) + "px";
  }

  return (
    <div 
      className={`w-full h-[50px] bg-[#444444] rounded-[5px] flex flex-row gap-x-[15px] items-center px-[13px] 
      ${isSelected ? "border-dashed border-[#9c9c9c] border-[3px]" : "border-none"} `}
      ref={layerRef}
      onClick={switchLayer}
      onMouseDown={(e) => changePositionAbsolute(e)}
      onMouseUp={(e) => changePositionStatic(e)}
      onMouseMove={(e) => {moveDraggable(e)}}

    >
      <button onClick={changeHidden}>
        {hidden ? 
        (<Image src={"/closed-eye.png"} alt={'hidden'} width={25} height={25}/>) : 
        (<Image src={"/open-eye.png"} alt={"unhidden"} width={25} height={25} />)}
      </button>
      <VSeparator />
      <CanvasLayer />
      <h1 className="text-[15px] text-white">{name}</h1>
     
    </div>
  )
}

export default Layer