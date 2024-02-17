"use client"

import React, { useState } from 'react'
import UiButton from '../ui-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { openModalColor } from '@/lib/features/modalColorSlice'

const ColorButton = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalColor);

  const handleColor = () => {
    dispatch(openModalColor());
    
  }

  return (
    <UiButton icon={'/color.png'} fn={handleColor} isSelected={modal.open}/>
  )
}

export default ColorButton