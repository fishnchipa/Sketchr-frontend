"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { VSeparator } from '../separator';
import CanvasLayer from './canvas-layer';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeLayer, changeLayerPosition, changeVisibility } from '@/lib/features/layersMenuSlice';

type LayerProps = {
  id: string
  name: string,
  isSelected: boolean
}

const Layer = ({id, name, isSelected}: LayerProps) => {
  const menu = useAppSelector((state) => state.layerMenu);
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null); 
  const isDragging = useRef(false);
  const layerPosY = useRef(0);
  const layerPosX = useRef(0);

  const changeHidden = () => {
    setHidden(prev => !prev);
    dispatch(changeVisibility(id));

    const nextLayerIndex = menu.layers.findIndex((value) => value.id === id);
    if (nextLayerIndex !== 0) {
      const layer = menu.layers[nextLayerIndex - 1];
      dispatch(changeLayer(layer.id));
    }
  }

  const switchLayer = () => {
    dispatch(changeLayer(id));

  }

  const changePositionAbsolute = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }
    isDragging.current = true;
  }

  const changePositionStatic = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }
    isDragging.current = false;
    if (layerPosY.current >= 1 && layerPosX.current > 0) {
      let index = Math.round(layerPosY.current / 55 + 1)
      if (index > menu.layers.length) {
        index = menu.layers.length;
      }
      const output = {
        id: id,
        index: index
      }
      
      dispatch(changeLayerPosition(output));
    }
    layerRef.current.style.position = "static";
  }


  const moveDraggable = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!layerRef.current) {
      return;
    }

    if (isDragging.current) {
      layerRef.current.style.position = "absolute";
      const bound = e.currentTarget.getBoundingClientRect();
      const posX = e.clientX - bound.x + e.currentTarget.offsetLeft - (e.currentTarget.offsetWidth/2);
      const posY = e.clientY - bound.y + e.currentTarget.offsetTop - (e.currentTarget.offsetHeight/2);
      layerRef.current.style.left = posX + "px";
      layerRef.current.style.top = posY + "px";
      layerPosY.current = posY - 80; 
      layerPosX.current = posX + 170;
    } 


  }

  return (
    <>

      <div 
        className={`w-[259px] h-[50px] bg-[#444444] rounded-[5px] flex flex-row gap-x-[15px] items-center px-[13px] 
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
    </>
  )
}

export default Layer