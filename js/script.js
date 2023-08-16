/***********************
/*         Import
/**********************/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
	getDatabase,
	ref,
	push,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

/***********************
/*         Settings
/**********************/
const appSettings = {
	databaseURL:
		'https://shopping-list-89412-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, 'items');

/***********************
/*         DOM
/**********************/
const inputField = document.getElementById('input__field');
const addButton = document.getElementById('add__button');

/***********************
/*     EventListeners
/**********************/
addButton.addEventListener('click', () => {
	let inputValue = inputField.value;

	push(itemsInDB, inputValue);
	console.log(`${inputValue} added to database`);
});
