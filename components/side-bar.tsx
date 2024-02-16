import React from 'react'
import UiButton from './ui/ui-button'
import { HSeparator } from './ui/separator'


const SideBar = () => {
	return (
		<div className="w-[56px] h-full bg-[#494949] flex flex-col items-center gap-y-[15px] pt-[35px] border-r-[2px] border-black">
			<UiButton icon={'/brush.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/eraser.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/cursor.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/fill.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/eyedrop.png'} fn={() => { } } isSelected={false} />
			<HSeparator />
			<UiButton icon={'/transform.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/move.png'} fn={() => { } } isSelected={false} />
			<HSeparator />
			<UiButton icon={'/selection.png'} fn={() => { } } isSelected={false} />
			<UiButton icon={'/circleSelection.png'} fn={() => { } } isSelected={false} />
		</div>
	)
}

export default SideBar