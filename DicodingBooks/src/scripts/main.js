function main() {
  const baseUrl = "https://books-api.dicoding.dev";

  const getBook = () => {
    // tuliskan kode di sini!
    fetch(`${baseUrl}/list`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllBooks(responseJson.books);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  //INTERNAL SERVER ERROR ON POSTMAN AND CORS PROBLEM ON LOCALHOST
  const insertBook = (book) => {
    // tuliskan kode di sini!
    //Membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      console.log(responseJson);
      showResponseMessage(responseJson.message);
      getBook();
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    //Membuat POST request dan Menetapkan target URL
    xhr.open("POST", "https://books-api.dicoding.dev/add");

    //Menetapkan properti Content-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Auth-Token", "12345");

    //Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    xhr.send(JSON.stringify(book));
  };

  const updateBook = (book) => {
    // tuliskan kode di sini!
  };

  const removeBook = (bookId) => {
    // tuliskan kode di sini!
  };

  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector("#listBook");
    listBookElement.innerHTML = "";

    books.forEach((book) => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const bookId = event.target.id;

        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const inputBookId = document.querySelector("#inputBookId");
    const inputBookTitle = document.querySelector("#inputBookTitle");
    const inputBookAuthor = document.querySelector("#inputBookAuthor");
    const buttonSave = document.querySelector("#buttonSave");
    const buttonUpdate = document.querySelector("#buttonUpdate");

    buttonSave.addEventListener("click", function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };

      insertBook(book);
    });

    buttonUpdate.addEventListener("click", function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;
