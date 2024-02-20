"use client"

import React, { useRef, useState } from 'react'
import ChangeColorModal from './ui/change-color/change-color-modal'
import Canvas from './ui/layers-menu/canvas'
import { useAppSelector } from '@/lib/hooks'

const Body = () => {
	const canvas = useAppSelector((state) => state.layerMenu);

	return (
		<>
			<ChangeColorModal />
			<div className="h-full w-full bg-[#868686] flex justify-center items-center">
				<div className="h-[500px] w-[1000px] bg-white" >
					{canvas.layers.map((value, index) => {
						return (
							<Canvas key={value} id={index}/>
						)
					})}
				</div>
			</div>
		</>

		
	)
}

export default Body