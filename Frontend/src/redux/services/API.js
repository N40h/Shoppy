import { setLogin, setRegister } from '../reducers/authSlice';

export const register = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://mern-shoppy.onrender.com/api/users/register`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				dispatch(setRegister());
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://mern-shoppy.onrender.com/api/users/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				dispatch(setLogin({ token: data.token }));
				sessionStorage.setItem('user', data.token);
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const logout = () => {
	sessionStorage.removeItem('user');
};
