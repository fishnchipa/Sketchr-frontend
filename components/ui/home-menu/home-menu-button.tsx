import React from 'react'

type HomeMenuButtonProps = {
	text: string,
	fn: () => void
}

const HomeMenuButton = ({text, fn}: HomeMenuButtonProps) => {
	return (
		<button className="w-[250px] h-[23px] font-semibold text-white text-[20px] text-left flex items-center">
			{text}
		</button>
	)
}

export default HomeMenuButton