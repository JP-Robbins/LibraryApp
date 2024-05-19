const myLibrary = [];

function Book(title, author, pages, read) {
  this.title= title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
 const form = document.getElementById("form");
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObject = {};

  formData.forEach(function(value, key) {
    formDataObject[key] = value;
  });

  if (bookAlreadyExists(formDataObject)) {
    console.log("Error: Book already exists in the library.");
    return;
  }
const newBook = new Book(
  formDataObject.title,
  formDataObject.author,
  formDataObject.pages,
  formDataObject.read
);

myLibrary.push(newBook);

console.log("Book added to library", newBook);

renderLibrary();
})
};

function bookAlreadyExists(bookData) {
  return myLibrary.some(book => book.title === bookData.title && book.author === bookData.author);
}

function renderLibrary() {
const library = document.getElementById("library")
library.innerHTML = "";

myLibrary.forEach((book, index) => {
  const div = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("h2");
  const pages = document.createElement("h2");
  const read = document.createElement("button");
  const removeButton = document.createElement("button");

  
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read === "Yes" ? "Yes" : "Not yet";
  removeButton.textContent = "Remove";

  div.appendChild(title);
  div.appendChild(author); 
  div.appendChild(pages);
  div.appendChild(read);
  div.appendChild(removeButton);

  read.addEventListener("click", () => {
    changeReadStatus(book);
    renderLibrary();
  })

  removeButton.addEventListener("click", () => {
    removeBook(index);
    renderLibrary();
  })
  
  library.appendChild(div);
});
}

function changeReadStatus(book) {
  if (book.read === "Yes") {
    book.read = "Not yet"
  } else if (book.read === "Not yet") {
    book.read = "Yes";
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

document.addEventListener("DOMContentLoaded",function() {
  addBookToLibrary();
  console.log("Initial library: ", myLibrary);
})