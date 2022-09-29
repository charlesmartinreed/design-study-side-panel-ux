// ELEMENTS
const navPanel = document.getElementById("nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");

let animDelay = 0.2;

// LISTENERS
albumCards.forEach((albumCard) => {
  albumCard.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    let id = e.target.parentElement.getAttribute("data-album-id");
    console.log(id);
  });
});

navItems.forEach((navItem) => {
  // console.log(navItems.indexOf(navItem));
  // let animDelay = 0.2;
  // animDelay += 0.2;
  // navItem.addEventListener("mouseenter", (e) => {
  //   triggerNavAnimation();
  // });
  // navItem.addEventListener("mouseleave", (e) => {
  //   removeNavAnimation();
  // });
});

navPanel.addEventListener("mouseenter", triggerNavAnimation);
navPanel.addEventListener("mouseleave", removeNavAnimation);

function triggerNavAnimation(delay) {
  navItems.forEach((navItem) => {
    navItem.style.animationDelay = `${delay}s`;

    if (!navItem.classList.contains("unfold")) navItem.classList.add("unfold");
  });
}

function removeNavAnimation() {
  navItems.forEach((navItem) => {
    navItem.classList.remove("unfold");
  });
}

// MODALS
function displayAlbumModal(albumID) {
  // the artist, album details would be pulled in from an API here...
  console.log(albumModal.classList);
  albumModal.classList.add("active");
}
