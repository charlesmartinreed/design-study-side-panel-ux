// ELEMENTS
const navPanel = document.getElementById("nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");

let animDelay = 0.2;
let modalIsActive = false;

// LISTENERS
albumCards.forEach((albumCard) => {
  albumCard.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    let id = e.target.parentElement.getAttribute("data-album-id");
    populateModal(id);
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

window.addEventListener("click", (e) => {
  if (e.target.classList.contains(".modal-album")) {
    console.log("modal inner clicked");
    for (let child of albumModal.children) {
      if (e.target.matches(child)) {
        console.log("child clicked");
        return;
      }
    }
  }
});

// MODALS
function toggleModal() {
  modalIsActive = !modalIsActive;

  albumModal.classList.toggle("active", modalIsActive);
  handleModalInForeground();
}

function populateModal(albumID) {
  toggleModal();
  console.log("populating modal", albumID);
  // the artist, album details would be pulled in from an API here...

  // console.log("modal state is now", modalIsActive);
}

function handleModalInForeground() {
  // document.querySelector("body").style.pointerEvents = "none";
  let pageBody = document.querySelector(".page-container");

  for (let child of pageBody.children) {
    // console.log(child);
    if (modalIsActive === true) {
      child.style.pointerEvents = "none";
      child.style.filter = "blur(3px)";
    }

    if (modalIsActive === false) {
      child.style.pointerEvents = "all";
      child.style.filter = "none";
    }
    // panel-item, nav-panel, 'content-panels

    // console.log(child);
  }

  // document.querySelector("body").style.filter = "blur(3px)";
}
