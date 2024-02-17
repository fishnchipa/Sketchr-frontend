"use client"

import { useAppSelector } from '@/lib/hooks'
import React from 'react'
import LayerComposition from './layer-composition';

const LayersMenu = () => {
  const layerMenu = useAppSelector((state) => state.layerMenu);


  if (layerMenu.open) {
    return (
      <div className="h-full w-[316px] bg-[#494949] border-l-[2px] border-black flex flex-col pt-[12px] px-[20px] gap-y-[22px]">
        <h1 className="text-white text-[20px] font-extrabold">Layers</h1>
        <LayerComposition />
      </div>
    )
  }
}

export default LayersMenu