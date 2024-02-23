"use client"

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React, { useState } from 'react'
import FriendsMenu from './friends-menu';
import RequestsMenu from './requests-menu';
import { setFriends, setRequests } from '@/lib/features/usersMenuSlice';

const UsersMenu = () => {
	const usersMenu = useAppSelector((state) => state.usersMenu);
	const dispatch = useAppDispatch();

	const openFriend = () => {
		dispatch(setFriends());
	}

	const openRequests = () => {
		dispatch(setRequests());
	}

	if (usersMenu.open) {
		return (
			<div className="w-[280px] h-full bg-[#494949] border-l-[2px] border-black flex flex-col items-center pt-[40px] gap-y-[32px] px-5">
				<div className="w-[242px] h-[45px] rounded-[60px] flex flex-row items-center justify-center relative bg-[#595959] gap-x-[5px]">
					<div className={`w-[113px] h-[35px] rounded-[60px] absolute bg-[#9B9B9B]
					${usersMenu.friendsRequests ? "left-[6px]" : "left-[124px]"} transition-all`}></div>
					<button 
						className="w-[113px] h-[35px] rounded-[50px] text-[12px] text-white font-semibold z-10 "
						onClick={openFriend}
					>
						Friends
					</button>
					<button 
						className="w-[113px] h-[35px] rounded-[50px] text-[12px] text-white font-semibold z-10 "
						onClick={openRequests}
					>
						Requests
					</button>
				</div>
				{usersMenu.friendsRequests ? <FriendsMenu /> : <RequestsMenu />}
			</div>
		)
	}
}

export default UsersMenu