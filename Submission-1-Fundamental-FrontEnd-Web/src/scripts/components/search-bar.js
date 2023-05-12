class SearchBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector("#searchBar").value;
  }

  render() {
    this.innerHTML = `
      <div id="search-container" class="d-flex justify-content-around">
      <input
        class="form-control w-75 me-4"
        placeholder="Search Pokemon Here"
        type="search"
        name="Search Pokemon"
        id="searchBar"
      />
      <button class="btn btn-primary w-25" id="btnSearch" type="submit">
        Search
      </button>
    </div>`;

    this.querySelector("#btnSearch").addEventListener(
      "click",
      this._clickEvent
    );
  }
}

customElements.define("search-bar", SearchBar);
