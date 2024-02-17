"use client"

import Image from 'next/image'
import React from 'react'
import Layer from './layer'
import { useAppSelector } from '@/lib/hooks'

const LayerComposition = () => {
  const menu = useAppSelector((state) => state.layerMenu);
  const layers = menu.layers

  const createNewLayer = () => {
    
  }

  return (
    <div className="w-full h-full pb-[100px]">
      <div className="w-full h-[50px] flex items-center pl-[13px] rounded-t-[5px] bg-[#656565]">
        <button>
          <Image src={"/plus.png"} width={25} height={25} alt="add layer"/>
        </button>
      </div>
      <div className="bg-[#393939] h-full rounded-b-[5px] p-[8px] flex flex-col gap-y-[5px]">
        <Layer name={"Layer 1"}/>
        <Layer name={"Layer 2"}/>
      </div>
    </div>
  )
}

export default LayerComposition