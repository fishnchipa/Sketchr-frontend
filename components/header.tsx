import React from 'react'

import SliderButton from '@/components/ui/slider-button'
import HomeButton from '@/components/ui/fn-button/home-button'
import ColorButton from '@/components/ui/fn-button/color-button'
import UsersButton from '@/components/ui/fn-button/users-button'
import LayersButton from '@/components/ui/fn-button/layers-button'

const Header = () => {
  return (
    <header>
      <div 
        className="h-[56px] w-full bg-[#494949] stroke-black flex flex-row
        drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] border-b-[2px] border-black
        "
      >
        <div 
          className="h-[56px] flex justify-center items-center min-w-[56px]
          border-black border-r-[2px]"
          >
            <HomeButton />
        </div>
        <div className="flex flex-row justify-between items-center w-full px-[30px]">
          <div className="flex flex-row gap-x-[15px]">
            <ColorButton />
            <SliderButton text={"Size"} increment={(num: number) => {console.log("Size: " + num)}}/>
            <SliderButton text={"Opacity"} increment={(num: number) => {console.log("Opacity: " + num)}}/>
          </div>
          <div className="flex flex-row gap-x-[15px]">
            <UsersButton />
            <LayersButton />
          </div>
        </div>
          
      </div>
    </header> 
  )
}

export default Header
