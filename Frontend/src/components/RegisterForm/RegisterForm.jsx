import React, { useState} from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/services/API";

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(register(email, password))
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <form className="register__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email" />
                <label htmlFor="password">Password :</label>
                <input type="password" id="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password} placeholder="Password" />
                <p>Already have an account?<Link to="/login" className="form__link">Log in</Link></p>
                <button type="submit">Register</button>
            </form>
        </React.Fragment>
    )
}