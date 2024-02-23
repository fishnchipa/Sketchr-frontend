"use client"

import React from 'react'
import SliderButton from '@/components/ui/slider-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { changeOpacity } from '@/lib/features/toolSlice';

const OpacitySliderButton = () => {
  const opacity = useAppSelector((state) => state.tools.opacity);
  const dispatch = useAppDispatch();

  const handleOpacity = (value: number) => {
    dispatch(changeOpacity(value));
  }
  
  return (
    <SliderButton text={"Opacity"} increment={(value: number) => handleOpacity(value)} inital={opacity}/>
  )
}

export default OpacitySliderButton