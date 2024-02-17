"use client"

import React from 'react'
import HomeMenuButton from './home-menu-button'
import { useAppSelector } from '@/lib/hooks'

const HomeMenu = () => {
  const homeMenu = useAppSelector((state) => state.homeMenu);

  if (homeMenu.open) {
    return (
      <div className="w-[350px] h-full bg-[#494949] flex flex-col pt-[48px] gap-y-[15px] items-center border-r-[2px] border-black">
        <HomeMenuButton text={"Save"} fn={() => {}}/>
        <HomeMenuButton text={"Download"} fn={() => {}}/>
        <HomeMenuButton text={"Settings"} fn={() => {}}/>
        <HomeMenuButton text={"Full Screen Mode"} fn={() => {}}/>
        <HomeMenuButton text={"Create New Lobby"} fn={() => {}}/>
        <HomeMenuButton text={"Join New Lobby"} fn={() => {}}/>
      </div>
    )
  }
}

export default HomeMenu