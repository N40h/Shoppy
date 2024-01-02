import { createSlice } from '@reduxjs/toolkit';

const token = sessionStorage.getItem('user');

const initialState = {
	token: token ? token : null,
	isRegister: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.token = action.payload.token;
			state.isRegister = false;
			state.error = null;
		},
		setLogout: (state) => {
			state.token = null;
			state.isRegister = false;
			state.error = null;
		},
		setRegister: (state) => {
			state.isRegister = true;
			state.error = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		updateToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { setLogin, setLogout, setRegister, setError, updateToken } =
	authSlice.actions;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
