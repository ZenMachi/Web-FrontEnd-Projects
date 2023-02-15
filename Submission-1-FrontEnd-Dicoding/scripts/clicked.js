document.querySelectorAll(".nav-btn").forEach((ele) =>
  ele.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-btn")
      .forEach((ele) => ele.classList.remove("selected"));
    this.classList.add("selected")
  })
);