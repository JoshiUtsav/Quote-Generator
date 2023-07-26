// JavaScript (script.js)
const quotes = document.getElementById("quote");
const authors = document.getElementById("author");
const button = document.getElementById("button");
const tweetMe = document.getElementById("twitter");
let realData = [];
let quoteData = {};

const getNewQuotes = () => {
  if (realData.length === 0) {
    // If the data is not loaded, show a loading message
    quotes.innerHTML = `<h1>Loading...</h1>`;
    authors.innerHTML = `<h4>- Loading...</h4>`;
    return;
  }

  // Pick a random quote from the loaded data
  const rnum = Math.floor(Math.random() * realData.length);
  quoteData = realData[rnum];

  // Display the quote and author on the page
  quotes.innerHTML = `<h1>${quoteData.text}</h1>`;
  authors.innerHTML = `<h4>- ${quoteData.author || "Unknown"}</h4>`;
};

const getQuotes = async () => {
  const api = "https://type.fit/api/quotes";
  try {
    let data = await fetch(api);
    realData = await data.json();
    getNewQuotes();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    quotes.innerHTML = `<h1>Error fetching quotes</h1>`;
    authors.innerHTML = `<h4>- Error</h4>`;
  }
};

getQuotes();

const tweetIt = () => {
  // Check if quoteData is empty or undefined
  if (!quoteData || !quoteData.text || !quoteData.author) {
    return;
  }

  // Generate the tweet URL
  const tweetPost = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quoteData.text} ~ ${quoteData.author}`)}`;
  // Open the tweet URL in a new window
  window.open(tweetPost);
};

tweetMe.addEventListener("click", tweetIt);
button.addEventListener("click", getNewQuotes);
