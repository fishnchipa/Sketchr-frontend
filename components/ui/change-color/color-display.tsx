"use client"

import React, { useState } from 'react'
import ColorPrev from './color-prev';
import { useAppSelector } from '@/lib/hooks';

type ColorModelType = "rgb" | "hsv" | "hsl";

type ColorObject = {
	[key: string]: {
		[key: string]: number;
	};
}



const ColorDisplay = () => {
	const globalColor: ColorObject = useAppSelector((state) => state.localColor);
	const [colorModel, setColorModel] = useState<ColorModelType>("rgb");

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

	}

	const displayInput = (value: string) => {
		if (colorModel == "hsl" || colorModel == "hsv") {
			let displayValue = (globalColor[colorModel][value]);
			if (value == "hue") {
				displayValue = parseFloat((displayValue).toFixed(1));
			} else {
				displayValue = parseFloat((displayValue*100).toFixed(1));
			}
		
			return (
				<div key={value} className="flex flex-row justify-between items-center w-[200px]"> 
					<h1 className="text-white text-[15px] font-semibold">{value}</h1>
					<input 
						className="w-[98px] h-[22px] bg-white ring-offset-background focus-visible:outline-none 
						focus-visible:ring-0 focus-visible:ring-ring p-1 text-[10px]
						placeholder-black focus-visible:placeholder-gray-500 font-semibold"
						placeholder={displayValue.toString()}
						type="number"
						min="0"
						max="100"
						step=".1"
					/>
				</div>
			)
		} else {
			return (
				<div key={value} className="flex flex-row justify-between items-center w-[200px]"> 
					<h1 className="text-white text-[15px] font-semibold">{value}</h1>
					<input 
						className="w-[98px] h-[22px] bg-white ring-offset-background focus-visible:outline-none 
						focus-visible:ring-0 focus-visible:ring-ring p-1 text-[10px]
						placeholder-black focus-visible:placeholder-gray-500 font-semibold"
						placeholder={Math.round(globalColor[colorModel][value]).toString()}
						type="number"
						min="0"
						max="255"
						step=".1"
						onChange={(e) => {}}
					/>
				</div>
			)
		}
	}

	return (
		<div className="w-[265px] h-[175px] rounded-[20px] bg-[#9B9B9B] flex flex-col items-center py-[10px] gap-y-[18px]">
			<div 
				className="w-[223px] h-[22px] rounded-[20px] bg-[#494949] flex flex-row items-center 
				justify-center gap-x-[3px] relative py-[10px]"
			>
				<div 
					className={`w-[72px] h-[18px] rounded-[20px] bg-[#7B7B7B] absolute
					${(colorModel === "hsv") ? "left-[75.5px]" : 
					((colorModel === "hsl") ? "left-[149px] " : "left-[1.5px]")} transition-all`}
				
				></div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("rgb")}}>
						<h1 className="text-[10px] text-white font-semibold">RGB</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("hsv")}}>
						<h1 className="text-[10px] text-white font-semibold">HSV</h1>
					</button>
				</div>
				<div className="w-[72px] h-[18px] rounded-[20px] flex justify-center items-center z-10">
					<button onClick={() => {setColorModel("hsl")}}>
						<h1 className="text-[10px] text-white font-semibold">HSL</h1>
					</button>
				</div>
			</div>
			<div className="flex flex-col justify-center gap-y-[5px]">
				{Object.keys(globalColor[colorModel]).map((value) => {
					return displayInput(value);
				})}
			</div>
			<ColorPrev />
		</div>
	)
}

export default ColorDisplay