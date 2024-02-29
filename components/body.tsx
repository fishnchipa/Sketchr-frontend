"use client"

import React, { useRef, useState } from 'react'
import ChangeColorModal from './ui/change-color/change-color-modal'
import Canvas from './ui/layers-menu/canvas'
import { useAppSelector } from '@/lib/hooks'
import { CanvasRef } from '@/lib/types'

const Body = () => {
	const canvas = useAppSelector((state) => state.layerMenu);
	const canvasRefs = useRef<CanvasRef[] >([])
	
	const mouseUp = () =>{
		const index = canvas.layers.findIndex(value => value.id === canvas.selected);
		canvasRefs.current[index].mouseUp();
	}

	return (
		<>
			<ChangeColorModal />
			<div className="h-full w-full bg-[#868686] flex justify-center items-center"
				onMouseUp={() => mouseUp()}
			
			>
				<div className="relative h-[500px] w-[1000px] bg-white" >
					{canvas.layers.map((value) => {
						const index = canvas.layers.findIndex(item => item.id === value.id);

						return (
							<Canvas key={value.id} id={value.id} ref={(el) => canvasRefs.current[index] = el!}/>
							
						)
					})}
				</div>
			</div>
		</>

		
	)
}

export default Body