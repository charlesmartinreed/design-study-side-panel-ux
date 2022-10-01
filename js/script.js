// ELEMENTS
const navPanel = document.querySelector("#nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");
const optionsPanel = document.querySelector("#options-panel");
const optionsPanelCloseBtn = document.querySelector("#btn-options-close");

let animDelay = 0.2;
let modalIsActive = false;

// LISTENERS
optionsPanelCloseBtn.addEventListener("click", (e) => {
  removeNavAnimation();
  optionsPanel.classList.remove("active");
});

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    if (!optionsPanel.classList.contains("active")) {
      optionsPanel.classList.add("active");
    }
  });
});

navPanel.addEventListener("mouseenter", () => {
  triggerNavAnimation();
});

navPanel.addEventListener("mousenter", triggerNavAnimation);
navPanel.addEventListener("mouseleave", (e) => {
  if (optionsPanel.classList.contains("active")) return;
  removeNavAnimation();
});

function triggerNavAnimation(delay) {
  navItems.forEach((navItem) => {
    navItem.style.animationDelay = `${delay}s`;

    if (!navItem.classList.contains("unfold")) navItem.classList.add("unfold");
  });

  navPanel.style.backgroundColor = `rgba(10, 10, 34, 1)`;
  navPanel.style.paddingRight = `150px`;
}

function removeNavAnimation() {
  navItems.forEach((navItem) => {
    if (navItem.classList.contains("unfold"))
      navItem.classList.remove("unfold");
  });

  navPanel.style.backgroundColor = `initial`;
  navPanel.style.paddingRight = `0px`;
}

window.addEventListener("click", (e) => {
  if (e.target.parentElement.matches(".panel-item")) {
    let id = e.target.parentElement.getAttribute("data-album-id");
    populateModal(id);
    return;
  }

  if (modalIsActive) {
    if (e.target.className === "modal-album active") {
      return;
    }

    if (e.target.className !== "modal-album active") {
      for (const child of albumModal.children) {
        for (const innerChild of child.children) {
          if (
            e.target.className === child.className ||
            e.target.className === innerChild.className
          ) {
            console.log("modal child clicked");
            return;
          }
        }
      }
      toggleModal();
    }
  }
});

// MODALS
function toggleModal() {
  console.log("modal toggling now");
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
  // let pageBody = document.querySelector(".page-container");
  let pageBody = document.querySelector("body");

  for (let child of pageBody.children) {
    if (child.className !== "modal-album active") {
      if (modalIsActive === true) {
        child.style.pointerEvents = "none";
        child.style.filter = "blur(3px)";
        child.style.opacity = "0.1";
        pageBody.style.overflowY = "hidden";
      }

      if (modalIsActive === false) {
        child.style.pointerEvents = "all";
        child.style.filter = "none";
        child.style.opacity = "1";
        pageBody.style.overflow = "auto";
      }
    }
  }
}
