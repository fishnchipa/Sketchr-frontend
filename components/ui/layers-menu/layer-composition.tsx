"use client"

import Image from 'next/image'
import React from 'react'
import Layer from './layer'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addNewLayer } from '@/lib/features/layersMenuSlice'

const LayerComposition = () => {
  const menu = useAppSelector((state) => state.layerMenu);
  const dispatch = useAppDispatch();
  const layers = menu.layers

  const createNewLayer = () => {
    dispatch(addNewLayer());
  }

  return (
    <div className="w-full h-full pb-[100px]">
      <div className="w-full h-[50px] flex items-center pl-[13px] rounded-t-[5px] bg-[#656565]">
        <button onClick={createNewLayer}>
          <Image src={"/plus.png"} width={25} height={25} alt="add layer"/>
        </button>
      </div>
      <div className="bg-[#393939] h-full rounded-b-[5px] p-[8px] flex flex-col gap-y-[5px]">
        {layers.map((value, index)  => {
          if (menu.selected == index) {
            return (
              <Layer key={value} name={`Layer ${index}`} isSelected={true} id={index}/>
            )
          } else {
            return (
              <Layer key={value} name={`Layer ${index}`} isSelected={false} id={index}/>
            )
          }
        })}
      </div>
    </div>
  )
}

export default LayerComposition