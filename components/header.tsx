import React from 'react'
import UiButton from './ui/ui-button'
import SliderButton from './ui/slider-button'

const Header = () => {
  return (
    <header>
      <div 
        className="h-[56px] w-full bg-[#494949] stroke-black flex flex-row
        drop-shadow-[0_1px_2px_rgba(0,0,0,1.25)] border-b-[2px] border-black
        "
      >
        <div 
          className="h-[56px] flex justify-center items-center min-w-[56px]
          border-black border-r-[2px]"
          >
            <UiButton icon={'/home.png'} fn={() => {}}/>
        </div>
        <div className="flex flex-row justify-between items-center w-full px-[30px]">
          <div className="flex flex-row gap-x-[15px]">
            <UiButton icon={'/color.png'} fn={() => {}}/>
            <SliderButton text={"Size"} increment={(num: number) => {console.log("Size: " + num)}}/>
            <SliderButton text={"Opacity"} increment={(num: number) => {console.log("Opacity: " + num)}}/>
          </div>
          <div className="flex flex-row gap-x-[15px]">
            <UiButton icon={'/people.png'} fn={() => {}}/>
            <UiButton icon={'/layer.png'} fn={() => {}}/>
          </div>
        </div>
          
      </div>
    </header> 
  )
}

export default Header
