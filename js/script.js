/***********************
/*       Import
/**********************/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
	getDatabase,
	ref,
	push,
	onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

/***********************
/*      Settings
/**********************/
const appSettings = {
	databaseURL:
		'https://shopping-list-89412-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

/***********************
/*         DOM
/**********************/
const inputField = document.getElementById('input__field');
const addButton = document.getElementById('add__button');
const shoppingList = document.getElementById('shopping__list');

/***********************
/*     EventListeners
/**********************/
addButton.addEventListener('click', () => {
	let inputValue = inputField.value;

	push(shoppingListInDB, inputValue);

	clearInputField();
});

/***********************
/*      Functions
/**********************/
onValue(shoppingListInDB, function (snapshot) {
	let shoppingItemsArray = Object.values(snapshot.val());

	clearShoppingList();

	for (let i = 0; i < shoppingItemsArray.length; i++) {
		let shoppingItem = shoppingItemsArray[i];

		let shoppingItemValue = shoppingItem[1];
		let shoppingItemID = shoppingItem[0];

		appendItemToShoppingList(shoppingItem);
	}
});

function clearShoppingList() {
	shoppingList.innerHTML = '';
}

function clearInputField() {
	inputField.value = '';
}

function appendItemToShoppingList(itemValue) {
	shoppingList.innerHTML += `<li>${itemValue}</li>`;
}
