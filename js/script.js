// ELEMENTS
const navPanel = document.querySelector(".nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");

// LISTENERS
albumCards.forEach((albumCard) => {
  albumCard.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    let id = e.target.parentElement.getAttribute("data-album-id");
    console.log(id);
  });
});

navItems.forEach((navItem) => {
  navItem.addEventListener("mouseenter", (e) => {
    navItem.classList.add("unfold");
  });

  navItem.addEventListener("mouseleave", (e) => {
    navItem.classList.remove("unfold");
  });
});

// MODALS
function displayAlbumModal(albumID) {
  // the artist, album details would be pulled in from an API here...
  console.log(albumModal.classList);
  albumModal.classList.add("active");
}
