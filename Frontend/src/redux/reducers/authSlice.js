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
		},
		setLogout: (state) => {
			state.token = null;
		},
		setRegister: (state) => {
			state.isRegister = true;
		},
	},
});

export const { setLogin, setLogout, setRegister } = authSlice.actions;
export default authSlice.reducer;
