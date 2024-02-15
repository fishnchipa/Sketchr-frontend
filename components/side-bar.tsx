import React from 'react'
import UiButton from './ui/ui-button'
import Separator from './ui/separator'


const SideBar = () => {
	return (
		<div className="w-[56px] h-full bg-[#494949] flex flex-col items-center gap-y-[15px] pt-[35px] border-r-[2px] border-black">
			<UiButton icon={'/brush.png'} fn={() => {}} />
			<UiButton icon={'/eraser.png'} fn={() => {}} />
			<UiButton icon={'/cursor.png'} fn={() => {}} />
			<UiButton icon={'/fill.png'} fn={() => {}} />
			<UiButton icon={'/eyedrop.png'} fn={() => {}} />
			<Separator />
			<UiButton icon={'/transform.png'} fn={() => {}} />
			<UiButton icon={'/move.png'} fn={() => {}} />
			<Separator />
			<UiButton icon={'/selection.png'} fn={() => {}} />
			<UiButton icon={'/circleSelection.png'} fn={() => {}} />
		</div>
	)
}

export default SideBar