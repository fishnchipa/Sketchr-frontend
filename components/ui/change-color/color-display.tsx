"use client"

import React, { useState } from 'react'

type ColorModelType = "RGB" | "HSV" | "HSL";

const colors = {
	RGB: ["Red", "Green", "Blue"],
	HSV: ["Hue", "Saturation", "Value"],
	HSL: ["Hue", "Saturation", "Lightness"]
}



const ColorDisplay = () => {

	const [colorModel, setColorModel] = useState<ColorModelType>("RGB");

	return (
		<div className="w-[265px] h-[175px] rounded-[20px] bg-[#9B9B9B] flex flex-col items-center p-[10px]">
			<div 
				className="w-[223px] h-[22px] rounded-[20px] bg-[#494949] flex flex-row items-center 
				justify-center gap-x-[1px] relative"
			>
				<div 
					className={`w-[72px] h-[18px] rounded-[20px] bg-[#7B7B7B] absolute
					${(colorModel === "HSV") ? "left-[75.5px] delay-0" : 
					((colorModel === "HSL") ? "left-[149px] delay-100" : "left-[2px] delay-100")} transition-all`}
				
				></div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("RGB")}}>
						<h1 className="text-[10px] text-white">RGB</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("HSV")}}>
						<h1 className="text-[10px] text-white">HSV</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("HSL")}}>
						<h1 className="text-[10px] text-white">HSL</h1>
					</button>
				</div>
			</div>
			
			
		</div>
	)
}

export default ColorDisplay