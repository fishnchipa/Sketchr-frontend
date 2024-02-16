import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
	open: false,
	friendsRequests: true 
};

const UsersMenuSlice = createSlice({
	name: "usersMenu",
	initialState,
	reducers: {
		openMenu: (state) => {
			state.open = true;
		},
		closeMenu: (state) => {
			state.open = false;
		},
		cycleMenu: (state) => {
			state.open = !state.open;
		},
		setFriends: (state) => {
			state.friendsRequests = true;
		},
		setRequests: (state) => {
			state.friendsRequests = false;
		}
	}
})

export const { openMenu, closeMenu, cycleMenu, setFriends, setRequests } = UsersMenuSlice.actions;
export default UsersMenuSlice.reducer;