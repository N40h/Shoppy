import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/services/API";
import { selectError, setError } from "../../redux/reducers/authSlice";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsEmailValid(true);
        setIsPasswordValid(true);

        if (!email.trim() || !password.trim()) {
            if (!email.trim()) {
                setIsEmailValid(false);
            }
            if (!password.trim()) {
                setIsPasswordValid(false);
            }
            dispatch(setError('All fields are required'))
            return
        }

        try {
            const data = await dispatch(login(email, password))
            if (data && data.error) {
                dispatch(setError(data.error))
            }
        } catch (error) {
            dispatch(setError(error.message));
        }
        
    }

    return (
        <React.Fragment>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(event) => { setEmail(event.target.value); setIsEmailValid(true) }}
                    value={email}
                    className={isEmailValid ? "" : "invalid"}
                    placeholder="Email" />
                <label htmlFor="password">Password :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(event) => { setPassword(event.target.value); setIsPasswordValid(true) }}
                    value={password}
                    className={isPasswordValid ? "" : "invalid"}
                    placeholder="Password" />
                {error && <p className="error">{error}</p>}
                <p>Don't have an account yet? <Link to="/register" className="form__link">Register</Link></p>
                <button type="submit">Log in</button>
            </form>
        </React.Fragment>
    )
}