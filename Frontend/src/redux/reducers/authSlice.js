import { createSlice } from '@reduxjs/toolkit';

const token = sessionStorage.getItem('user');

const initialState = {
	token: token ? token : null,
	isRegister: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.token = action.payload.token;
			state.isRegister = false;
		},
		setLogout: (state) => {
			state.token = null;
			state.isRegister = false;
		},
		setRegister: (state) => {
			state.isRegister = true;
		},
	},
});

export const { setLogin, setLogout, setRegister } = authSlice.actions;
export default authSlice.reducer;
