// ELEMENTS
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

console.log(albumModal);
// MODALS
function displayAlbumModal(albumID) {
  // the artist, album details would be pulled in from an API here...
  console.log(albumModal.classList);
  albumModal.classList.add("active");
}
