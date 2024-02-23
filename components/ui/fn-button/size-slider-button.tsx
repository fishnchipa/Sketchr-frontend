"use client"

import React, { useEffect } from 'react'
import SliderButton from '@/components/ui/slider-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeSize } from '@/lib/features/toolSlice';

const SizeSliderButton = () => {
  const size = useAppSelector((state) => state.tools.size);
  const dispatch = useAppDispatch();

  const handleSize = (value: number) => {
    dispatch(changeSize(value));
  }

  return (
    <SliderButton text={"Size"} increment={(value: number) => {handleSize(value)}} inital={size}/>
  )
}

export default SizeSliderButton