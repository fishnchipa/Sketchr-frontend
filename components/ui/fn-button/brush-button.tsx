"use client"

import { Point } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import UiButton from '@/components/ui/ui-button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeTool } from '@/lib/features/toolSlice';

const BrushButton = () => {
	const dispatch = useAppDispatch();
	const tool = useAppSelector((state) => state.tools.selected);
	const [selected, setSelected] = useState(true);

	useEffect(() => {
		tool === "brush" ? setSelected(true) : setSelected(false);
	},[tool]);

	const setBrush = () => {
		dispatch(changeTool("brush"));
	}

	return (
		<UiButton icon={'/brush.png'} fn={setBrush} isSelected={selected} />
	)
}

export default BrushButton