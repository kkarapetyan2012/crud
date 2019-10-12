const url = 'https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/';
const endpoint = 'item';

const $ = function (selector) { // reusable function for shorthed
	return document.querySelector(selector); // select all html tag by give selector like in css 
  }


/*** function get fetch and added avatar images and title ***/
const users = function () {
	fetch("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/users")
	.then(response => response.json())
	.then(data => {
		data.forEach(blogger => {

			const aside = document.getElementById('aside');
			const div = document.createElement('div');

			const avatarBlock = aside.appendChild(div);
			avatarBlock.classList.add('avatar', 'd-flex', 'box-shadow', 'align-items_center');
			const avatarImg = document.createElement('div');

			avatarBlock.appendChild(avatarImg);
			avatarImg.classList.add('avatar-img');
			const img = document.createElement('img');
			avatarImg.appendChild(img);
			img.src = `${blogger.avatar}`;

			const avatarTitle = document.createElement('div');
			avatarBlock.appendChild(avatarTitle);
			avatarTitle.innerHTML = `${blogger.name}`;
			avatarTitle.classList.add('avatar-title');
		})
	})
	.catch(function (err) {
		console.log("Error", err);
	});
}


const articles = function () {
	fetch("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/postblog")
	.then(response => response.json())
	.then(data => {
		data.forEach(postblog => {
			
			const articleContainer = document.getElementById('article-container');

			const div = document.createElement('div');

			const articleBlock = articleContainer.appendChild(div);
			articleBlock.classList.add('article');

			const authorName = document.createElement('div');
			authorName.classList.add('authorName');
			//articleBlock.appendChild(authorName);

			const postTitle = document.createElement('div');
			postTitle.classList.add('postTitle');
			articleBlock.appendChild(postTitle);

			const header = document.createElement('header');
			articleBlock.appendChild(header);
			header.classList.add('d-flex', 'justify-content_space-between', 'article-header');
			header.appendChild(postTitle);
			header.appendChild(authorName);

			const description = document.createElement('div');
			description.classList.add('description');
			articleBlock.appendChild(description);

			authorName.innerHTML = `${postblog.author}`;
			postTitle.innerHTML = `${postblog.title}`;
			description.innerHTML = `${postblog.description}`;
		})
	})
	.catch(function (err) {
		console.log("Error", err);
	});
}

users();

articles();


/*** create modal window  ***/


// function showModal(){
// 	const myModal = document.getElementById('myModal');
// 	myModal.style.display ='flex';

// 	const modal = document.createElement('div');
// 	myModal.appendChild(modal);
// 	modal.classList.add('modal','d-flex', 'flex-direction_column', 'box-shadow');

// 	// modalheader
// 	const modalHeader = document.createElement('div');
// 	modal.appendChild(modalHeader);
// 	modalHeader.classList.add('modalHeader', 'd-flex', 'justify-content_flex-end');

// 	const x = document.createElement('span');
// 	modalHeader.appendChild(x);
// 	x.innerHTML = 'x';
// 	const close = x.classList.add('close');
// 	x.setAttribute('id','close');
// 	x.setAttribute('onclick','ddd()');
// 	function ddd() {
// 		myModal.hidden('slow');
// 	}

// 	//ddd();
	
// 	//myModal.style.display ='none';

// 	// create input element
// 	const input = document.createElement("INPUT");
// 	input.setAttribute("type", "text");
// 	input.setAttribute("placeholder" , "title");
// 	modal.appendChild(input);

// 	// create textarea
// 	const textarea = document.createElement("TEXTAREA");
// 	//input.setAttribute("type", "text");
// 	textarea.setAttribute("placeholder" , "text");
// 	modal.appendChild(textarea);

// 	// add news
// 	const add = document.createElement('button');
// 	add.classList.add('add');
// 	add.innerHTML = 'Add';
// 	modal.appendChild(add);
// 	add.setAttribute('id','submit');
// 	add.setAttribute('onclick','writeLED()');
// 	// const add = document.createElement('button');
// 	// const add = document.createElement('buttonLED').setAttribute('onclick','writeLED()');
// 	// modal.appendChild(add);
	
// }

// showModal();


// const submit = document.getElementById('submit');

// submit.addEventListener("click", function () {
// 	// createNewsPost();
// 	alert(1)
// })


// const createNewsPost = () => {
	
// 	const createDataObject = {
// 		postTitle: postTitle.value,
// 		description: description.value
// 	}

// 	fetch("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/postblog", 
// 	{
// 		method: 'POST', // or 'PUT'
// 		body: JSON.stringify(data), // data can be string or {object}!
// 		headers: {
// 		  'Content-Type': 'application/json'
// 		}
// 	  })
// 	  .then(function (response) {
// 		  if(response.ok && response.status === 201) {

// 		  }
// 	  })
// }

let newID = null;

const onReady = function () {
	console.log('DOM Loaded');
	getItemList(function (data) {
		createTable(data);
	})

	const add = document.getElementById('add');
	add.addEventListener('click', function() {
		if(newID) {
			newItem()
		} else {
			//createItem();
			function addPost() {
				createItem();
			}
		}
	})
}


function showModal() {
	const myModal = document.getElementById('myModal');
	myModal.style.display = 'flex';
}

// function closeModal(callback) {
// 	const button = document.getElementById('close');
// 	button.setAttribute('onclick','ddd()');
	
// 	callback();
// }

// function ddd() {
// 	const myModal = document.getElementById('myModal');
// 	myModal.style.display = 'none';
// }



// function addPost() {
// 	createItem();
// }

const createTable = function (data) {
	const tbody = $('.news-container');
	let template = '';
	for (let i = 0; i < data.length; i++) {
	  
	  const row = `
			<section class="box-shadow">
			  
			  <div class="postTitle">${data[i].postTitle}</div>
			  <div class="description-news">${data[i].description}</div>
			  
			</section>
		`;
  
	  template += row 
	}
	
	tbody.innerHTML = template;
  }

const newItem = function () {
	const postTitle = $('#postTitle');
	const description = $('#description');

	const updateData = {
		postTitle: postTitle.value,
		description: description.value
	}

	fetch (
		`${url}${endpoint}/${newID}`,
		{
			method: "PUT",
			body: JSON.stringify(data), 
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	.then(function (response) {
		if(response.ok && response.status === 200) {
			getItemList(function (data){
				createTable(data)
			})
			postTitle.value = '',
			description.value = ''
		}
	})
	.catch(function (err) {
		console.log("ERROR", err)
	})
}

const getItemList = function (callback) {
	fetch (
		`${url}${endpoint}`
	)
	.then (function (response) {
		if(response.ok && response.status == 200) {
			return response.json()
			.then(function (responseData){
				callback(responseData)
			})
			.catch();
		}
	})
}

const createItem = function () {
	const postTitle = $('#postTitle');
	const description = $('#description'); 

	const data = {
		description: description.value,
		postTitle: postTitle.value		
	}

	fetch (
		`${url}${endpoint}`,
		{
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	.then (function (response) {
		if(response.ok && response.status === 201) {
			getItemList(function (data) {
				createTable(data)
			})
			postTitle.value = '',
			description.value = ''
		}
	})
	.catch(function(err) {
		console.log("ERROR", err)
	})
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}