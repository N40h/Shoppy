/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import CatIcon from "../../assets/cat.png"

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [shoppingItems, setShoppingItems] = useState([])

    useEffect(() => {
        fetchShoppingList();
    }, [])

    const fetchShoppingList = async () => {
        try {
            const response = await fetch('https://mern-shoppy.onrender.com/api/shopping-list')

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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: inputValue})
            })

            fetchShoppingList();
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
                    'Content-Type': 'application/json'
                },
            })
            fetchShoppingList();
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value)
    }

    return (
    <React.Fragment>
        <img src={CatIcon} alt="Shopping List Icon" />
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