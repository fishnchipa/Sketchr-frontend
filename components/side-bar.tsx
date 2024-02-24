import React from 'react'
import { HSeparator } from '@/components/ui/separator'
import ToolButton from './ui/fn-button/tools-button'
import { toolOptions } from '@/lib/types'


const SideBar = () => {
	const canvasTools: toolOptions[] = ["brush", "eraser", "cursor", "fill", "eyedrop"];
	const transformTools: toolOptions[] = ["transform", "move"];
	const selectionTools: toolOptions[] = ["selection", "circleSelection"];

	return (
		<div className="w-[56px] h-full bg-[#494949] flex flex-col items-center gap-y-[15px] pt-[35px] border-r-[2px] border-black">

			{canvasTools.map(value => {
				return (
					<ToolButton key={value} type={value}/>
				)
			})}

			<HSeparator />
			{transformTools.map(value => {
				return (
					<ToolButton key={value} type ={value} />
				)
			})}
			<HSeparator />
			{selectionTools.map(value => {
				return (
					<ToolButton key={value} type ={value} />
				)
			})}
		</div>
	)
}

export default SideBar