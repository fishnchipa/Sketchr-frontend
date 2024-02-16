"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type UiButtonProps = {
  icon: string,
  fn: () => void,
  isSelected: boolean
}

const UiButton = ({icon, fn, isSelected}: UiButtonProps) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fn();
  }

  return (
    <button onClick={(e) => {handleClick(e)}}>
      <div className={`flex justify-center items-center w-[35px] h-[35px] rounded-[5px] ${isSelected ? "bg-[#9B9B9B]" : "bg-transparent"}`}>
        <Image width={25} height={25} src={icon} alt="button" priority/>
      </div>
    </button>
  )
}

export default UiButton