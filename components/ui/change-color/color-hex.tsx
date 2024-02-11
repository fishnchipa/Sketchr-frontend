import React from 'react'

const ColorHex = () => {
	return (
		<div className="w-[160px] h-[109px] rounded-[20px] flex flex-col items-center p-[20px] bg-[#9B9B9B]">
			<div className="flex flex-row justify-between w-full items-center">
				<h1 className="text-[10px] text-white">Hex</h1>
				<input className="w-[86px] h-[22px] bg-white"/>
			</div>
		</div>
	)
}

export default ColorHex