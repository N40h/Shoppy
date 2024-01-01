import { setLogin, setRegister, setError } from '../reducers/authSlice';

export const register = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:4000/api/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(setRegister());
				return data;
			} else {
				const errorData = await response.json();
				dispatch(setError(errorData.error));
				throw new Error(errorData.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`http://localhost:4000/api/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(setLogin({ token: data.token }));
				sessionStorage.setItem('user', data.token);
				return data;
			} else {
				const errorData = await response.json();
				dispatch(setError(errorData.error));
				throw new Error(errorData.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const logout = () => {
	sessionStorage.removeItem('user');
};
