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

	console.log(inputValue);
});
