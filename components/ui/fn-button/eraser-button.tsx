"use client"

import React, { useEffect, useState } from 'react'
import UiButton from '@/components/ui/ui-button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeTool } from '@/lib/features/toolSlice';

const EraserButton = () => {
	const dispatch = useAppDispatch();
	const tool = useAppSelector((state) => state.tools);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		tool.selected === "eraser" ? setSelected(true) : setSelected(false);
	},[tool]);

	const setBrush = () => {
		dispatch(changeTool("eraser"));
	}


  return (
    <UiButton icon={'/eraser.png'} fn={setBrush} isSelected={selected} />
  )
}

export default EraserButton