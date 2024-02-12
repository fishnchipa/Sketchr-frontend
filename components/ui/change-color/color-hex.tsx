"use client"

import { useAppSelector } from '@/lib/hooks'
import { rgbToHEX } from '@/lib/utils';
import React from 'react'

const ColorHex = () => {
	const rgb = useAppSelector((state) => state.localColor.rgb);
	const hex = rgbToHEX(Math.round(rgb.red), Math.round(rgb.green), Math.round(rgb.blue));

	return (
		<div className="w-[160px] h-[109px] rounded-[20px] flex flex-col items-center p-[20px] bg-[#9B9B9B]">
			<div className="flex flex-row justify-between w-full items-center">
				<h1 className="text-[15px] text-white font-semibold">Hex</h1>
				<input 
					className="w-[86px] h-[22px] bg-white ring-offset-background focus-visible:outline-none 
					focus-visible:ring-0 focus-visible:ring-ring p-1 text-[10px] placeholder-black
					focus-visible:placeholder-gray-500 font-semibold" 
					placeholder={hex}
				/>
			</div>
		</div>
	)
}

export default ColorHex
