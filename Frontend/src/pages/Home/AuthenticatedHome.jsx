/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CatIcon from "../../assets/cat.png"
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/reducers/authSlice";

export default function AuthenticatedHome() {
    const token = useSelector((state) => state.auth.token);
    const [inputValue, setInputValue] = useState('');
    const [shoppingItems, setShoppingItems] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            fetchShoppingList();
        }
    }, [token]);

    const fetchShoppingList = async () => {
        try {
            const response = await fetch('https://mern-shoppy.onrender.com/api/shopping-list', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json();
            setShoppingItems(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddItem = async () => {
        try {
            const response = await fetch('https://mern-shoppy.onrender.com/api/shopping-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: inputValue })
            })

            await fetchShoppingList();
            setInputValue('');
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteItem = async (itemID) => {
        try {
            const response = await fetch(`https://mern-shoppy.onrender.com/api/shopping-list/${itemID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            await fetchShoppingList();
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value)
    }

    const handleLogout = () => {
        dispatch(setLogout());
        sessionStorage.removeItem('user');
    }

    return (
        <React.Fragment>
            <img src={CatIcon} alt="Shopping List Icon" className="cat-icon" />
            <div className="icons">
                <FontAwesomeIcon icon={faRightFromBracket} className="logout" onClick={handleLogout} />
            </div>
            <input type="text" id="input__field" onChange={handleChange} value={inputValue} placeholder="Milk" />
            <button id="add__button" onClick={handleAddItem}>Add to cart</button>
            <ul id="shopping__list">
                {shoppingItems.map((item) => (
                    <li key={item._id} onClick={() => handleDeleteItem(item._id)}>{item.name}</li>
                ))}
            </ul>
        </React.Fragment>
    )
}