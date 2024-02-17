"use client"

import React from 'react'
import UiButton from '../ui-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { cycleMenu } from '@/lib/features/homeMenuSlice'


const HomeButton = () => {
  const menu = useAppSelector((state) => state.homeMenu);
  const dispatch = useAppDispatch();

  const handleMenu = () => {
    dispatch(cycleMenu());
  }

  return (
    <UiButton icon={'/home.png'} fn={handleMenu} isSelected={menu.open}/>
  )
}

export default HomeButton