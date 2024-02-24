"use client"

import { changeTool } from '@/lib/features/toolSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'
import UiButton from '@/components/ui/ui-button';
import { toolOptions } from '@/lib/types';

type ToolButtonProps = {
	type: toolOptions,
}

const ToolButton = ({ type }: ToolButtonProps) => {
	const dispatch = useAppDispatch();
	const tool = useAppSelector((state) => state.tools.selected);
	const [selected, setSelected] = useState(true);

	useEffect(() => {
		tool === type ? setSelected(true) : setSelected(false);
	},[tool]);

	const setBrush = () => {
		dispatch(changeTool(type));
	}


	return (
		<UiButton icon={`/${type}.png`} fn={setBrush} isSelected={selected} />
	)
}


export default ToolButton