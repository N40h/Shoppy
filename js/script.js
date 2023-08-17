/***********************
/*       Import
/**********************/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
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
	if (snapshot.exists()) {
		let shoppingItemsArray = Object.entries(snapshot.val());

		clearShoppingList();

		for (let i = 0; i < shoppingItemsArray.length; i++) {
			let shoppingItem = shoppingItemsArray[i];
			let shoppingItemID = shoppingItem[0];
			let shoppingItemValue = shoppingItem[1];

			appendItemToShoppingList(shoppingItem);
		}
	} else {
		shoppingList.innerHTML = 'No items here...';
	}
});

function clearShoppingList() {
	shoppingList.innerHTML = '';
}

function clearInputField() {
	inputField.value = '';
}

function appendItemToShoppingList(item) {
	let itemID = item[0];
	let itemValue = item[1];

	let newItem = document.createElement('li');

	newItem.textContent = itemValue;

	newItem.addEventListener('click', () => {
		let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

		remove(exactLocationOfItemInDB);
	});

	shoppingList.appendChild(newItem);
}
