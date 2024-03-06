import { Link } from "react-router-dom"

export default function Menu() {
    return (
        <main>
            <h1>Welcome to Shoppy</h1>
            <p>Shoppy is where simplicity meets efficiency. Enjoy effortless shopping list management with just a few clicks. Whether you're a seasoned shopper or a first-timer, Shoppy is your go-to solution. Log in or register today and redefine your shopping experience!</p>
            <div className="menu__links">
                <Link to={"/login"} className="menu__links--btn">Log In</Link>
                <Link to={"/register"} className="menu__links--btn">Register</Link>
            </div>
        </main>
    )
}