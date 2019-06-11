// Get location of the import script in the HTML file and gather author name and query limit
function locateImportScriptAndData(authorOrLimit) {
	let steemAuthor = document.querySelector('#SteemFeedLoader')
	let queryLimit = steemAuthor.dataset.queryLimit
	steemAuthor = steemAuthor.dataset.steemAuthor

	if (authorOrLimit === 'author') {
		return steemAuthor
	} else {
		return queryLimit
	}
}

// Get HTTP requests
function Get(yourUrl) {
	let Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET", yourUrl, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function getSteemData() {
	// Get current encoded date for steem api
	let date = new Date()
	let year = date.getUTCFullYear()
	let month = date.getUTCMonth()
	let day = date.getUTCDate()
	let hour = date.getUTCHours()
	let minutes = date.getUTCMinutes()
	let seconds = date.getUTCSeconds()
	let encodedDate = encodeURIComponent(`${year}-${month}-${day}T${hour}:${minutes}:${seconds}`)

	return JSON.parse(Get(`https://api.steemjs.com/get_discussions_by_author_before_date?author=${locateImportScriptAndData('author')}&beforeDate=${encodedDate}&limit=${locateImportScriptAndData()}`))

}

// Add the div tags to put the blog in
function createBlog() {
	let generator = document.getElementById('SteemFeedLoader')
	let steemDiv = '<div id="SteemFeed"></div>'
	generator.insertAdjacentHTML("beforebegin", steemDiv)
}

// Adds blog items to array
function getAuthorSteemBlogs(data) {
	console.log(data)
	for (let i = 0; i < data.length; i++) {
			steemFeed.push(data[i].body)
	}
}

// main function where the Steem-Feed functions are called
function addBlogItemsToDOM() {

	let data = getSteemData()
	console.log(data)
	createBlog()
	getAuthorSteemBlogs(data)
	console.log(steemFeed.length)
	for (let i = 0; i < steemFeed.length; i++) {
		let divAdder = document.createElement("DIV")
		divAdder.id = `Blog${i}`
		document.getElementById("SteemFeed").appendChild(divAdder)
		document.getElementById(`Blog${i}`).innerHTML = steemFeed[i].replace('\n', '<br><br>')
	}

}

// Call main function and declare an empty variable *THIS NEEDS TO BE REWORKED TO NOT RELY ON GLOBAL VARIABLES PREFERABLY*
let steemFeed = [];
addBlogItemsToDOM();