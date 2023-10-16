import React, {useState} from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/services/API";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(login(email, password))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <React.Fragment>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email" />
                <label htmlFor="password">Password :</label>
                <input type="password" id="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password} placeholder="Password" />
                <p>Don't have an account yet? <Link to="/register" className="form__link">Register</Link></p>
                <button type="submit">Log in</button>
            </form>
        </React.Fragment>
    )
}