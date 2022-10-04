const navPanelHTMLObjects = {
  Settings: {
    classTitle: "settings-panel-user-info",
    html: `
    <div class="settings-panel-profile-pane">
    <div>
    <img class="user-info-profile-pic" src="./images/default-profile-photo.jpg" alt="" />
  </div>
  <div>
    <p id="settings-pane-user-name">Member Name</p>
    <a href="#!" id="settings-pane-user-status">Membership Status</a>
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
  Social: {
    classTitle: `social-panel-settings-pane`,
    html: `
  <div class="social-panel">
          <div class="social-panel-image">
            <img
              class="social-panel-friend-image"
              src="./images/test_user_profile_img.jpg"
              alt=""
            />
          </div>
          <div class="social-panel-details">
            <p class="social-panel-friend-name">
              <a href="#!">Random User Type Person</a>
            </p>
            <p class="social-panel-last-listened-song">
              Last Listened to <span>Song by Some Music Person</span>
            </p>
            <p class="social-panel-last-favorited-item">
              Last Favorited <span>Album by Another Music Person</span>
            </p>
          </div>
        </div>
        <div class="social-panel">
          <div class="social-panel-image">
            <img
              class="social-panel-friend-image"
              src="./images/test_user_profile_img.jpg"
              alt=""
            />
          </div>
          <div class="social-panel-details">
            <p class="social-panel-friend-name">
              <a href="#!">Random User Type Person</a>
            </p>
            <p class="social-panel-last-listened-song">
              Last Listened to <span>Song by Some Music Person</span>
            </p>
            <p class="social-panel-last-favorited-item">
              Last Favorited <span>Album by Another Music Person</span>
            </p>
          </div>
        </div>
        <div class="social-panel">
          <div class="social-panel-image">
            <img
              class="social-panel-friend-image"
              src="./images/test_user_profile_img.jpg"
              alt=""
            />
          </div>
          <div class="social-panel-details">
            <p class="social-panel-friend-name">
              <a href="#!">Random User Type Person</a>
            </p>
            <p class="social-panel-last-listened-song">
              Last Listened to <span>Song by Some Music Person</span>
            </p>
            <p class="social-panel-last-favorited-item">
              Last Favorited <span>Album by Another Music Person</span>
            </p>
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
    // console.log(e.target);
    let clickedNavItem;
    triggerNavAnimation();

    if (e.target.classList.contains("nav-item")) {
      clickedNavItem = e.target;
    } else {
      clickedNavItem = e.target.parentElement;
    }

    if (clickedNavItem.id === "nav-home") {
      if (optionsPanel.classList.contains("active")) {
        closeOptionsPanel();
        removeNavAnimation();
      }
      return;
    }

    if (clickedNavItem.id !== "nav-home") {
      let sectionTitle = clickedNavItem.dataset.sectionTitle;
      let sectionClass = navPanelHTMLObjects[sectionTitle].classTitle;
      let sectionHTML = navPanelHTMLObjects[sectionTitle].html;

      if (optionsPanel.classList.contains("active")) {
        closeOptionsPanel();
      }

      layoutOptionsPanel(sectionClass, sectionHTML, sectionTitle);
      optionsPanel.classList.add("active");
    }
  });
});

navPanel.addEventListener("mouseenter", (e) => {
  triggerNavAnimation();
});

navPanel.addEventListener("mouseleave", (e) => {
  if (optionsPanel.classList.contains("active")) return;
  removeNavAnimation();
});

function triggerNavAnimation() {
  navItems.forEach((navItem) => {
    navItem.classList.add("unfold");
  });

  navPanel.style.backgroundColor = `rgba(10, 10, 34, 1)`;
  navPanel.style.paddingRight = `150px`;
}

function removeNavAnimation() {
  navItems.forEach((navItem) => {
    navItem.classList.remove("unfold");

    navPanel.style.backgroundColor = `initial`;
    navPanel.style.paddingRight = `0px`;
  });
}

function closeOptionsPanel() {
  console.log("closing panel");

  for (const child of optionsPanel.children) {
    optionsPanel.removeChild(child);
    console.log("children now", optionsPanel.children);
  }

  optionsPanel.classList.remove("active");
  optionsPanel.innerHTML = "";

  console.log(
    "closing options panel, html now looks like",
    optionsPanel.innerHTML
  );
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
  let contentDiv = document.createElement("div");

  contentDiv.className = sectionClass;
  contentDiv.innerHTML = sectionHtml;

  optionsPanel.appendChild(contentDiv);
  console.log(
    "laying out options panel, html now looks like",
    optionsPanel.innerHTML
  );
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
