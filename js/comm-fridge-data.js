let mainMenu = document.getElementById("mainDiv");
let fridgeMenu = document.getElementById("fridgeDiv");
let cartMenu = document.getElementById("cartMenu");
var cart = [];

//turns the state to the main menu while hiding everything else
function mainState(){
	//setting and hiding appropriate divs
	fridgeMenu.style.display = "none";
	cartMenu.style.display = "none";
	mainMenu.style.display = "block";

	//emptying cart
	cart = [];

	//emptying any dynamically added elements (I'm assuming that when the user returns to the menu, we want all progress to reset)
	let contents = document.getElementById("fridges");
	contents.innerHTML = "";
	contents = document.getElementById("dynamic");
	contents.innerHTML = "";

	let h1 = document.getElementById("menu");
	h1.hidden = "false";
}

//turns the state on the page to show the fridges while hiding everything else
function fridgeState(){
	//setting and hiding appropriate divs
	mainMenu.style.display = "none";
	cartMenu.style.display = "none";
	fridgeMenu.style.display = "block";

	let h1 = document.getElementById("menu");
	h1.hidden = false;

	//for each fridge in the array, display them and their info onto the html
	for(let fridge of fridges){
		let fridgeContainer = document.getElementById("fridges");
		let circle = document.createElement("div");
		circle.id = "fridge";

		let name = document.createElement("span");
		name.textContent = fridge.name;
		let street = document.createElement("span");
		street.textContent = fridge.address.street;
		let phonenumber = document.createElement("span");
		phonenumber.textContent = fridge.contact_phone;
		let image = document.createElement("img");
		image.src = "images/fridge.svg";
		image.id = "fridgeImage";

		name.className = "fridgeInfo";
		street.className = "fridgeInfo";
		phonenumber.className = "fridgeInfo";

		circle.appendChild(image);
		circle.appendChild(name);
		circle.appendChild(street);
		circle.appendChild(phonenumber);
		circle.className = fridge.address.street;

		//when the fridge is clicked, the street will be sent to the function
		circle.setAttribute("onclick", "cartState(className)");

		fridgeContainer.appendChild(circle);
	}
}

//when user clicks on a fridge, they will be brought to the cart state where they can add food
function cartState(fridgeAddress){
	//setting and hiding appropriate divs
	mainMenu.style.display = "none";
	fridgeMenu.style.display = "none";
	cartMenu.style.display = "block";

	//identifying which fridge was selected
	let fridge;
	fridge = getFridge(fridgeAddress);
	
	//dynamically adding the h1 tag
	let dynamicContent = document.getElementById("dynamic");
	let h1 = document.createElement("h1");
	h1.textContent = "Items in the " + fridge.name;
	h1.className = "headers";
	dynamicContent.appendChild(h1);

	//creating the 3 columns
	let leftColumn = document.createElement("div");
	leftColumn.id = "leftColumn";

	let midColumn = document.createElement("div");
	midColumn.id = "midColumn";

	let rightColumn = document.createElement("div");
	rightColumn.id = "rightColumn";

	//filling left column info
	let name = document.createElement("span");
	name.textContent = fridge.name;
	name.id = "lColName";

	let address = document.createElement("span");
	address.textContent = fridge.address.street;
	address.id = "lColAddress";

	let phonenumber = document.createElement("span");
	phonenumber.textContent = fridge.contact_phone;
	phonenumber.id = "lColPhone";

	let insidePercent = document.createElement("div");
	insidePercent.textContent = fridge.capacity+"%";
	insidePercent.style.width = fridge.capacity+"%";
	insidePercent.id = "lColInside";

	let outsidePercent = document.createElement("div");
	outsidePercent.id = "lColOutside";

	outsidePercent.appendChild(insidePercent);

	let produce = document.createElement("span");
	produce.id = "lColProduce";
	let numProduce = 0;
	let dairy = document.createElement("span");
	dairy.id = "lColDairy";
	let numDairy = 0;
	let bakery = document.createElement("span");
	bakery.id = "lColBakery";
	let numBakery = 0;
	let frozen = document.createElement("span");
	frozen.id = "lColFrozen";
	let numFrozen = 0;
	let pantry = document.createElement("span");
	pantry.id = "lColPantry";
	let numPantry = 0;


	//creating elements for the info in the middle column
	let items = Object.values(fridge.items)
	for(let item of items){
		//adding to the mid column
		let option = document.createElement("div");
		option.id = "row";
		option.className = item.type;

		let image = document.createElement("img");
		image.src= item.img;
		image.className = "foodImages";
		image.id = "foodImage"

		let name = document.createElement("span");
		name.textContent= item.name;
		name.className = "foodName";

		let quantity = document.createElement("span");
		quantity.textContent = "Quantity: " + item.quantity;
		quantity.className = "foodQuantity";

		let text = document.createElement("span");
		text.textContent = "Pickup item: ";
		text.className = "text";

		let plus = document.createElement("img");
		plus.className = "plus";
		plus.id = item.name;
		plus.src = "images/plus-sign-button.svg"
		plus.setAttribute("onclick", "addToCart(id)")

		let box = document.createElement("span");
		box.className = "box";
		box.id = item.name + "box";
		box.textContent = "0";

		let minus = document.createElement("img");
		minus.className = "minus";
		minus.id = item.name;
		minus.src = "images/minus-with-circle-3.png"
		minus.setAttribute("onclick", "removeFromCart(id)");

		option.appendChild(image);
		option.appendChild(name);
		option.appendChild(quantity);
		option.appendChild(text);
		option.appendChild(plus);
		option.appendChild(box);
		option.appendChild(minus);
		midColumn.appendChild(option);

		//adding quantity to the catrgory total (used for left column info)
		if(item.type == "produce") numProduce++;
		else if(item.type == "dairy") numDairy++;
		else if(item.type == "bakery") numBakery++;
		else if(item.type == "frozen") numFrozen++;
		else if(item.type == "pantry") numPantry++;
		
	}

	//creating elements for the right column
	let text2 = document.createElement("span")
	text2.textContent = "you have picked up the following items:"
	text2.id = "rightColText";
	rightColumn.appendChild(text2);
	
	//filling in text values for the categories of the left column
	produce.textContent = "Produce (" + numProduce + ")";
	dairy.textContent = "Dairy (" + numDairy + ")";
	bakery.textContent = "Bakery (" + numBakery + ")";
	frozen.textContent = "Frozen (" + numFrozen + ")";
	pantry.textContent = "Pantry (" + numPantry + ")";

	//setting onclick attribute for each category of food
	produce.setAttribute("onclick", 'byCategory("produce")');
	dairy.setAttribute("onclick", 'byCategory("dairy")');
	bakery.setAttribute("onclick", 'byCategory("bakery")');
	frozen.setAttribute("onclick", 'byCategory("frozen")');
	pantry.setAttribute("onclick", 'byCategory("pantry")');


	leftColumn.appendChild(name);
	leftColumn.appendChild(address);
	leftColumn.appendChild(phonenumber);
	leftColumn.appendChild(outsidePercent);
	leftColumn.appendChild(produce);
	leftColumn.appendChild(dairy);
	leftColumn.appendChild(bakery);
	leftColumn.appendChild(frozen);
	leftColumn.appendChild(pantry);

	dynamicContent.appendChild(leftColumn);
	dynamicContent.appendChild(midColumn);
	dynamicContent.appendChild(rightColumn);
}

//when the user clicks on the + button in the cartState
//Output: the item and quantity is added to the right column (user's cart)
//		  The box from the middle column is also added
function addToCart(name){
	
	let foodObject;
	let street = document.getElementById("lColAddress")
	let fridge = getFridge(street.textContent);

	let items = Object.values(fridge.items)
	foodObject = getItem(items, name);
	
	let box = document.getElementById(foodObject.name + "box");

	//checking if the item is already in our cart 
	for(thing of cart){
		if(thing[0] == foodObject.name){
			//item is in our cart so we add one to the total (alsong as we havent reached the quantity limit)
			if (Number(thing[1]) < Number(foodObject.quantity)){
				thing[1]++;
				box.textContent = Number(box.textContent) + 1;
				refreshCart();
				return;
			}
			//if quanity limit is reached, dont do anything
			else return;
		}
	}

	//in the case the the item was not in our cart, we add it
	cart.push([foodObject.name, 1]);
	box.textContent = Number(box.textContent) + 1;
	refreshCart();
	return;
}

//when the user clicks on the - button in the cartState
//Output: the item and quantity is subtracted to the right column (if quantity >0)
//		  The box from the middle column is also subtracted
function removeFromCart(name){
	let foodObject;
	let street = document.getElementById("lColAddress");
	let fridge = getFridge(street.textContent);
	let items = Object.values(fridge.items);
	foodObject = getItem(items, name);

	let box = document.getElementById(foodObject.name + "box");

	//checking if the item is already in our cart 
	for(thing of cart){
		if(thing[0] == foodObject.name){
			//item is in our cart so we add one to the total (alsong as we havent reached the quantity limit)
			if (Number(thing[1]) > 0){
				thing[1]--;
				//updating the box from the middle column
				box.textContent = Number(box.textContent) - 1;
				refreshCart();
				return;
			}
			else return;
		}
	}

	//in the case the the item was not in our cart, we do nothing
	refreshCart();
	return;
}

//refreshses the right column contents whenever an item is added or removed
function refreshCart(){
	let rightColumn = document.getElementById("rightColumn");
	rightColumn.innerHTML = "";

	let text2 = document.createElement("div")
	text2.textContent = "you have picked up the following items:"
	text2.id = "rightColText";
	rightColumn.appendChild(text2);
	
	for(item of cart){
		//ignoring items that have 0 quantity (theyre still in the cart because I didnt find a good way to remove specific indices)
		if(item[1] > 0 ){
			let food = document.createElement("span");
			food.className = "cartFoods";
			food.textContent = item[1] + " x " + item[0];
			rightColumn.appendChild(food);
		}
	}

}

//takes in the fridge street and returns a copy of the fridge object with corresponding street
function getFridge(street){
	for(let f of fridges){
		if (f.address.street == street){ 
			return f;
		}
	}
}

//goes through a list of food items, and returns the item with given name
function getItem(items, name){
	for(let item of items){
		if(name == item.name) {
			return item;
		}
	}
}

//sorts the middle column rows by the category of food
function byCategory(type){
	let rows = document.querySelectorAll("#row");
	let found = false;

	//checking that the category isn't empty
	for(row of rows){
		if(type == row.className){
			found=true;
			break;
		} 
	}
	if(!found) return;
	
	//hiding every row that doesnt match the category
	for(row of rows){
		if (type == row.className){
			row.style.display = "grid";
		}
		else row.style.display = "none";
	}
}




let fridgeA = {
	name: "Parkdale fridge", // name of the fridge
	capacity: 45,
	contact_person: "Jane Doe",
	contact_phone: " (613) 722-8019",

	// Location of the fridge
	address: {
		street: "30 Rosemount Ave #2",
		postal_code: "K1Y 1P4",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeB = {
	name: "Morrison fridge", // name of the fridge
	capacity: 80,
	contact_person: "John Doe",
	contact_phone: "(613) 596-6229",

	// Location of the fridge
	address: {
		street: "3985-A Morrison Drive",
		postal_code: "K2H 7L1",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeC = {
	name: "Somerset fridge", // name of the fridge
	capacity: 65,
	contact_person: "Mary Doe",
	contact_phone: "(613) 238-8210",

	// Location of the fridge
	address: {
		street: "55 Eccles Street",
		postal_code: "K1R 6S3",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};
let fridges = [fridgeA, fridgeB, fridgeC];

// categories: dairy, pantry, meat and seafood, produce, bakery, frozen
