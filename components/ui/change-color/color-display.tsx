"use client"

import React, { useState } from 'react'
import ColorPrev from './color-prev';

type ColorModelType = "RGB" | "HSV" | "HSL";

const colors = {
	RGB: ["Red", "Green", "Blue"],
	HSV: ["Hue", "Saturation", "Value"],
	HSL: ["Hue", "Saturation", "Lightness"]
}



const ColorDisplay = () => {

	const [colorModel, setColorModel] = useState<ColorModelType>("RGB");

	return (
		<div className="w-[265px] h-[175px] rounded-[20px] bg-[#9B9B9B] flex flex-col items-center py-[10px] gap-y-[18px]">
			<div 
				className="w-[223px] h-[22px] rounded-[20px] bg-[#494949] flex flex-row items-center 
				justify-center gap-x-[3px] relative py-[10px]"
			>
				<div 
					className={`w-[72px] h-[18px] rounded-[20px] bg-[#7B7B7B] absolute
					${(colorModel === "HSV") ? "left-[75.5px]" : 
					((colorModel === "HSL") ? "left-[149px] " : "left-[1.5px]")} transition-all`}
				
				></div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("RGB")}}>
						<h1 className="text-[10px] text-white font-semibold">RGB</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("HSV")}}>
						<h1 className="text-[10px] text-white font-semibold">HSV</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("HSL")}}>
						<h1 className="text-[10px] text-white font-semibold">HSL</h1>
					</button>
				</div>
			</div>
			<div className="flex flex-col justify-center gap-y-[11px]">
				{colors[colorModel].map((value) => {
					return (
						<div key={value} className="flex flex-row justify-between items-center w-[163px]"> 
							<h1 className="text-white text-[10px] font-semibold tracking-wider">{value}</h1>
							<input className="w-[98px] h-[22px] bg-white ring-offset-background focus-visible:outline-none 
							focus-visible:ring-0 focus-visible:ring-ring p-1 text-[10px] "/>
						</div>
					)
				})}
			</div>
			<ColorPrev />
		</div>
	)
}

export default ColorDisplay