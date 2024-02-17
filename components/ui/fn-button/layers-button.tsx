import React from 'react'
import UiButton from '@/components/ui/ui-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { cycleMenu } from '@/lib/features/layersMenuSlice';

const LayersButton = () => {
  const menu = useAppSelector((state) => state.layerMenu);
  const dispatch = useAppDispatch(); 

  const handleMenu = () => {
    dispatch(cycleMenu());
  }

  return (
    <UiButton icon={'/layer.png'} fn={handleMenu} isSelected={menu.open}/>
  )
}

export default LayersButton