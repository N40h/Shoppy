import React, { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/services/API";
import { selectError, setError, setRegister} from "../../redux/reducers/authSlice";

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const navigate = useNavigate();
    const isRegister = useSelector((state) => state.auth.isRegister)

    useEffect(() => {
        if (isRegister) {
            navigate('/login');
            dispatch(setRegister(false))
        }
    }, [isRegister, navigate, dispatch])

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
            const data = await dispatch(register(email, password))
            if (data && data.error) {
                dispatch(setError(data.error))
            }
        } catch (error) {
            dispatch(setError(error.message))
        }
    }

    return (
        <React.Fragment>
            <form className="register__form" onSubmit={handleSubmit}>
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
                <p>Already have an account?<Link to="/login" className="form__link">Log in</Link></p>
                {isRegister && (
                    <p className="success">Account created successfully</p>
                )}
                <button type="submit">Register</button>
            </form>
        </React.Fragment>
    )
}