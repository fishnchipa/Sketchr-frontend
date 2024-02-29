"use client"

import Image from 'next/image'
import React from 'react'
import Layer from './layer'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addNewLayer } from '@/lib/features/layersMenuSlice'

const LayerComposition = () => {
  const menu = useAppSelector((state) => state.layerMenu);
  const dispatch = useAppDispatch();
  

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
      <div className="bg-[#393939] h-full rounded-b-[5px] p-[8px] flex flex-col-reverse justify-end gap-y-[5px] ">
        {menu.layers.map((value)  => {
          if (menu.selected === value.id) {
            return (
              <Layer name={value.name} isSelected={true} id={value.id} key={value.id}/>
            )
          } else {
            return (
              <Layer name={value.name} isSelected={false} id={value.id} key={value.id}/>
            )
          }
        })}
      </div>
    </div>
  )
}

export default LayerComposition