import React from 'react'
import UiButton from '../ui-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { cycleMenu } from '@/lib/features/usersMenuSlice';

const UsersButton = () => {

  const menu = useAppSelector((state) => state.usersMenu);
  const dispatch = useAppDispatch();

  const handleMenu = () => {
    dispatch(cycleMenu());
  }


  return (
    <UiButton icon={'/people.png'} fn={handleMenu} isSelected={menu.open}/>
  )
}

export default UsersButton