import Image from 'next/image'
import React, { useState } from 'react'
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

  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false); 

  const changeHidden = () => {
    setHidden(prev => !prev);
    dispatch(changeVisibility(id));
  }

  const switchLayer = () => {
    dispatch(changeLayer(id));
    
  }

  return (
    <div 
      className={`w-full h-[50px] bg-[#444444] rounded-[5px] flex flex-row gap-x-[15px] items-center px-[13px] 
      ${isSelected ? "border-dashed border-[#9c9c9c] border-[3px]" : "border-none"} `}
      onClick={switchLayer}
 
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