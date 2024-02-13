import Image from 'next/image';
import React from 'react'

type UiButtonProps = {
  icon: string,
  fn: () => void;
  isSelected: boolean,
}

const UiButton = ({icon, fn, isSelected}: UiButtonProps) => {
  return (
    <button>
      <div className={`flex justify-center items-center w-[35px] h-[35px] rounded-[5px] ${isSelected ? "bg-[#9B9B9B]" : "bg-transparent"}`}>
        <Image width={25} height={25} src={icon} alt="button"/>
      </div>
    </button>
  )
}

export default UiButton