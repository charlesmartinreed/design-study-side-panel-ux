const navPanelHTMLObjects = {
  Settings: {
    classTitle: "settings-panel-user-info",
    html: `
    <div class="settings-panel-profile-pane">
    <div>
    <img class="user-info-profile-pic" src="./images/default-profile-photo.jpg" alt="" />
  </div>
  <div>
    <p>Member Name</p>
    <a href="#!">Membership Status</a>
  </div>
  </div>
<div class="settings-panel-settings-options">
  <div class="settings-option">
    <div>
      <p>Option A</p>
    </div>
    <div>
      <label class="settings-panel-toggle">
        <input type="checkbox" />
        <span class="checkbox-toggle"></span>
      </label>
    </div>
  </div>
  <div class="settings-option">
    <div>
      <p>Option B</p>
    </div>
    <div>
      <label class="settings-panel-toggle">
        <input type="checkbox" />
        <span class="checkbox-toggle"></span>
      </label>
    </div>
  </div>
  <div class="settings-option">
    <div>
      <p>Option C</p>
    </div>
    <div>
      <label class="settings-panel-toggle">
        <input type="checkbox" />
        <span class="checkbox-toggle"></span>
      </label>
    </div>
  </div>
</div>
`,
  },
  Trending: {
    classTitle: "trending-panel-items",
    html: `<div class="trending-panel-item">
  <img
    src="./images/elbow-flying-dream-1-art.jpg"
    alt=""
    class="trending-list-item-cover"
  />
  <div class="trending-list-item-description">
    <p class="trending-list-item-album-text">Album Title</p>
    <p class="trending-list-item-artist-text">Album Artist</p>
    <p class="trending-list-item-trending-in-text">Trending in Local</p>
  </div>
</div>
<div class="trending-panel-item">
  <img
    src="./images/elbow-flying-dream-1-art.jpg"
    alt=""
    class="trending-list-item-cover"
  />
  <div class="trending-list-item-description">
    <p class="trending-list-item-album-text">Album Title</p>
    <p class="trending-list-item-artist-text">Album Artist</p>
    <p class="trending-list-item-trending-in-text">Trending in Local</p>
  </div>
</div>
<div class="trending-panel-item">
  <img
    src="./images/elbow-flying-dream-1-art.jpg"
    alt=""
    class="trending-list-item-cover"
  />
  <div class="trending-list-item-description">
    <p class="trending-list-item-album-text">Album Title</p>
    <p class="trending-list-item-artist-text">Album Artist</p>
    <p class="trending-list-item-trending-in-text">Trending in Local</p>
  </div>
</div>
<div class="trending-panel-item">
  <img
    src="./images/elbow-flying-dream-1-art.jpg"
    alt=""
    class="trending-list-item-cover"
  />
  <div class="trending-list-item-description">
    <p class="trending-list-item-album-text">Album Title</p>
    <p class="trending-list-item-artist-text">Album Artist</p>
    <p class="trending-list-item-trending-in-text">Trending in Local</p>
  </div>
</div>
`,
  },
  Empty: { classTitle: null, html: null },
};

// ELEMENTS
const navPanel = document.querySelector("#nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");
const optionsPanel = document.querySelector("#options-panel");

let animDelay = 0.2;
let modalIsActive = false;

// LISTENERS

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    if (!optionsPanel.classList.contains("active")) {
      let sectionTitle;

      if (e.target.classList.contains("nav-item")) {
        sectionTitle = e.target.dataset.sectionTitle;
      }

      if (e.target.classList.contains("fa-solid")) {
        sectionTitle = e.target.parentElement.dataset.sectionTitle;
      }

      let sectionClass = navPanelHTMLObjects[sectionTitle].classTitle;
      let sectionHTML = navPanelHTMLObjects[sectionTitle].html;

      layoutOptionsPanel(sectionClass, sectionHTML, sectionTitle);
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
  modalIsActive = !modalIsActive;

  albumModal.classList.toggle("active", modalIsActive);
  handleModalInForeground();
}

function layoutOptionsPanel(sectionClass, sectionHtml, sectionTitle) {
  let headerElement = document.createElement("h1");
  headerElement.className = "options-panel-section-title";
  headerElement.textContent = sectionTitle;

  let contentDiv = document.createElement("div");
  contentDiv.className = sectionClass;
  contentDiv.innerHTML = sectionHtml;

  console.log(contentDiv);

  let buttonContainer = document.createElement("div");

  let closeButtonElement = document.createElement("button");
  closeButtonElement.className = "btn-options-close";
  closeButtonElement.id = "btn-options-close";
  closeButtonElement.textContent = "X";

  buttonContainer.appendChild(closeButtonElement);

  closeButtonElement.addEventListener("click", (e) => {
    removeNavAnimation();

    optionsPanel.removeChild(headerElement);
    optionsPanel.removeChild(contentDiv);
    optionsPanel.removeChild(buttonContainer);

    optionsPanel.classList.remove("active");
  });

  optionsPanel.appendChild(headerElement);
  optionsPanel.appendChild(contentDiv);
  optionsPanel.appendChild(buttonContainer);

  // console.log(contentDiv);

  // optionsPanel.querySelector("#options-panel-dynamic-section").innerHTML = html;

  // console.log(
  //   optionsPanel.querySelector(".options-panel-section-title").textContent
  // );

  // let optionsPanelCloseBtn = optionsPanel.querySelector("#btn-options-close");
}

function populateModal(albumID) {
  toggleModal();
  console.log("populating modal", albumID);
  // the artist, album details would be pulled in from an API here...
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
