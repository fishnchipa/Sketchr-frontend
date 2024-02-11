import React from 'react'

const ColorPrev = () => {

	// Global State
	const prevColors = [
		1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17
	]

	return (
		<div className="w-[218px] flex flex-row gap-x-[3px]">
			{prevColors.map(color => {
				return (
					<div key={color} className="w-[10px] h-[10px] bg-white">

					</div>
				)
			})}
			
		</div>
	)
}

export default ColorPrev