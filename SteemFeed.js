let steemAuthor = document.querySelector('#SteemFeedLoader')
let queryLimit = steemAuthor.dataset.queryLimit
steemAuthor = steemAuthor.dataset.steemAuthor

let steemFeed = []
let request = new XMLHttpRequest();
let feedURL = `http://www.steemrss.com/@${steemAuthor}/blog`
feedURL = 'http://www.whateverorigin.org/get?url=' + encodeURIComponent(feedURL) + '&callback=?'

console.log(feedURL)

request.open('GET', feedURL, true);

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		// Success!
		let data = JSON.parse(request.responseText);
		console.log(data)
		getAuthorSteemBlogs(data)
		createBlog()
		console.log(steemFeed.length)
		for (let i = 0; i < steemFeed.length; i++) {
			let divAdder = document.createElement("DIV")
			divAdder.id = `Blog${i}`
			document.getElementById("SteemFeed").appendChild(divAdder)
			document.getElementById(`Blog${i}`).innerHTML = steemFeed[i]
		}

	} else {
		// We reached our target server, but it returned an error
	}
};
request.onerror = function() {
	// There was a connection error of some sort
};
request.send();

function getAuthorSteemBlogs(data) {
	console.log(data)
	for (let i = 0; i < data.items.length; i++) {
		if (data.items[i].author == steemAuthor) {
			steemFeed.push(data.items[i].description)
		}
	}
}

function createBlog() {
	let generator = document.getElementById('SteemFeedLoader')
	let steemDiv = '<div id="SteemFeed"></div>'
	generator.insertAdjacentHTML("beforebegin", steemDiv)
}