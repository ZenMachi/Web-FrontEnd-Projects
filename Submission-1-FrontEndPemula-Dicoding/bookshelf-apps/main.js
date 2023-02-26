const books = [];
const RENDER_EVENT = 'render_books';
const SAVED_EVENT = 'saved-books'
const STORAGE_KEY = 'BOOKS_APPS';

function generatedID() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function addBook() {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const yearBook = document.getElementById('inputBookYear').value;
    const isCompletedBook = document.getElementById('inputBookIsComplete').checked;
    const generateID = generatedID();

    const bookObject = generateBookObject(generateID, titleBook, authorBook, yearBook, isCompletedBook)

    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;
    const textAuthor = document.createElement('p');
    textAuthor.innerText = `Penulis: ${bookObject.author}`;
    const textYear = document.createElement('p');
    textYear.innerText = `Tahun: ${bookObject.year}`;

    const undoBtn = document.createElement('button');
    undoBtn.classList.add('green');

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('red')
    trashBtn.innerText = 'Hapus Buku'
    trashBtn.addEventListener('click', function () {
        removeBook(bookObject.id);
    });

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('action');
    btnContainer.append(undoBtn, trashBtn);

    const articleContainer = document.createElement('article');
    articleContainer.classList.add('book_item');
    articleContainer.setAttribute('id', `book-${bookObject.id}`);

    if(bookObject.isCompleted) {
        undoBtn.innerText = 'Belum Selesai di Baca'
        undoBtn.addEventListener('click', function() {
            undoBookFromCompleted(bookObject.id);
        })
    } else {
        undoBtn.innerText = 'Selesai Dibaca'
        undoBtn.addEventListener('click', function() {
            addBookToCompleted(bookObject.id);
        })
    }
    articleContainer.append(textTitle, textAuthor, textYear, btnContainer);

    return articleContainer;
}


function addBookToCompleted(bookId) {
    const bookTarget = findBookId(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);

    if(bookTarget === -1) return;

    const result = confirm('Apakah Anda ingin Menghapus Buku ini?')
    if(result) {
        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBookId(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookId(bookId) {
    for (const bookItem of books) {
        if(bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBook(title) {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    let filtered = data.filter((item) => item.title.match(title));
    
    books.length = 0;
    for (const bookItem of filtered) {
        books.push(bookItem)
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookId) {
    for(const index in books) {
        if(books[index].id === bookId) {
            return index;
        }
    }
}

function saveData() {
    if(isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}

function isStorageExist() {
    if(typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null) {
        for(const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
})

document.addEventListener(RENDER_EVENT, function() {

    const incompleteBooks = document.getElementById('incompleteBookshelfList');
    incompleteBooks.innerHTML = '';
    const completeBooks = document.getElementById('completeBookshelfList');
    completeBooks.innerHTML = '';

    for(const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if(!bookItem.isCompleted) {
            incompleteBooks.append(bookElement);
        } else {
            completeBooks.append(bookElement);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    const searchForm = document.getElementById('searchBook');

    searchForm.addEventListener('submit', function(event) {
        const searchedName = document.getElementById('searchBookTitle').value;
        event.preventDefault();
        if(searchedName !== '') {
            findBook(searchedName);
        } else {
            books.length = 0;
            loadDataFromStorage();
        }
        
    })

    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
})