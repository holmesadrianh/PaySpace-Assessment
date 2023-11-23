let books = [
    { title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
    { title: "You Don’t Know JS", author: "Kyle Simpson", year: 2015 },
    { title: "Learning React", author: "Alex Banks and Eve Porcello", year: 2020 },
    { title: "HTML and CSS: Design and Build Websites", author: "Jon Duckett", year: 2011 },
    { title: "JavaScript and JQuery: Interactive Front-End Web Development", author: "Jon Duckett", year: 2014 },
    { title: "React Up & Running", author: "Stoyan Stefanov", year: 2016 },
    { title: "CSS Secrets", author: "Lea Verou", year: 2015 },
    { title: "Responsive Web Design with HTML5 and CSS", author: "Ben Frain", year: 2020 },
    { title: "Web Design with HTML, CSS, JavaScript and jQuery Set", author: "Jon Duckett", year: 2014 },
    { title: "Don’t Make Me Think", author: "Steve Krug", year: 2000 },
    { title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008 },
    { title: "React Native Cookbook", author: "Dan Ward", year: 2020 },
    { title: "Vue.js Up and Running", author: "Callum Macrae", year: 2018 },
    { title: "Angular Up and Running", author: "Shyam Seshadri", year: 2018 },
    { title: "Learning PHP, MySQL & JavaScript", author: "Robin Nixon", year: 2018 },
    { title: "Designing with Web Standards", author: "Jeffrey Zeldman", year: 2009 },
    { title: "Node.js Design Patterns", author: "Mario Casciaro & Luciano Mammino", year: 2020 },
    { title: "Programming PHP", author: "Kevin Tatroe, Peter MacIntyre, Rasmus Lerdorf", year: 2013 },
    { title: "High Performance Web Sites", author: "Steve Souders", year: 2007 },
    { title: "Building Progressive Web Apps", author: "Tal Ater", year: 2017 }
];


document.addEventListener("DOMContentLoaded", function () {
    // Selectors
    const searchInput = document.getElementById('search');
    const filterBySelect = document.getElementById('filterBy'); // Assuming you have an ID 'filterBy'
    const orderSelect = document.getElementById('order'); // Assuming you have an ID 'orderBy'
    const booksList = document.getElementById("books-list");

    // Event Listeners
    searchInput.addEventListener('input', updateBooksDisplay);
    filterBySelect.addEventListener('change', updateBooksDisplay);
    orderSelect.addEventListener('change', updateBooksDisplay);

    function updateBooksDisplay() {
        let filteredBooks = books.filter(book => {
            if (filterBySelect.value !== 'all') {
                return book[filterBySelect.value].toLowerCase().includes(searchInput.value.toLowerCase())
            } else {
                return book.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchInput.value.toLowerCase());
            }
        });
        if (filterBySelect.value !== 'all') {
            filteredBooks.sort((a, b) => a[filterBySelect.value].localeCompare(b[filterBySelect.value]));
        } else {
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (orderSelect.value === 'desc') {
            filteredBooks.reverse();
        }
        displayBooks(filteredBooks);
    }

    function displayBooks(booksArray) {
        booksList.innerHTML = '';
        booksArray.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('col-lg-3');
            bookElement.classList.add('col-6');
            bookElement.classList.add('mb-3');
            if (filterBySelect.value === 'author') {
                bookElement.innerHTML = `<div class="border p-4 h-100"><h5>${book.author}</h5><p>${book.title}, ${book.year}</p></div>`;
            }else{
                bookElement.innerHTML = `<div class="border p-4 h-100"><h5>${book.title}</h5><p>${book.author}, ${book.year}</p></div>`;
            }
            booksList.appendChild(bookElement);
        });
    }

    // Initialize with all books
    updateBooksDisplay();
});
