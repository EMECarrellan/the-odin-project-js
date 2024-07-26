const $addBtn = document.getElementById("add-btn");
const $title = document.getElementById("title");
const $author = document.getElementById("author");
const $pages = document.getElementById("pages");
const $readYes = document.getElementById("read-yes");
const $readNo = document.getElementById("read-no");
const $template = document.getElementById("card-template");
const $form = document.querySelector("form");
const $cardsContainer = document.getElementById("cards-container");
const $img = document.getElementById("image");

const myLibrary = [];
let $read = null;

const checkRadio = () => {
    $read = $readYes.checked ? "Read" : "Not read yet";
};

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = () => {
            return (`${this.title}, ${this.author}, ${this.pages}, ${this.read}`);
        };
    }
}

function addBookToLibrary(title, author, pages, read) {
    const test = new Book(title, author, pages, read);
    myLibrary.push([test.info()]);
    return myLibrary;
}

const addCard = () => {
    const clone = document.importNode($template.content, true);

    const cardButton = clone.querySelector(".check-read-btn");
    cardButton.textContent = $read;
    if ($readNo.checked) {
        cardButton.style.background = "#ff7676";
    }
    const imgUrl = $img.value;
    clone.querySelector("img").src = imgUrl;
    clone.querySelector("h2").textContent = $title.value;
    clone.querySelector("span").textContent = `Author: ${$author.value}`;
    clone.querySelectorAll("span")[1].textContent = `Pages: ${$pages.value}`;

    $cardsContainer.appendChild(clone);
};

const cleanForm = () => {
    $title.value = "";
    $author.value = "";
    $pages.value = "";
    $img.value = "";
    $readYes.checked = false;
    $readNo.checked = false;
};

$addBtn.addEventListener("click", () => {
    if ($form.checkValidity()) {
        checkRadio();
        addBookToLibrary($title.value, $author.value, $pages.value, $read);
        addCard();
        cleanForm();
        console.log(myLibrary);
    } else {
        alert("Please fill out all required fields");
    }
});

$cardsContainer.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("check-read-btn")) {
        if (event.target.textContent === "Read") {
            event.target.style.background = "#ff7676";
            event.target.textContent = "Not read yet";
        } else {
            event.target.style.background = "rgb(137, 255, 118)";
            event.target.textContent = "Read";
        }
    }
});