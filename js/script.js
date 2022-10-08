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
    classTitle: "trending-panel-settings-pane",
    html: `
    <div class="trending-panel-panes">
      <div class="trending-panel-pane" data-album-id="test">
        <div class="trending-panel-album-cover-container">
      <img
      src="./images/elbow-flying-dream-1-art.jpg"
      alt=""
      class="trending-panel-album-cover-image"
    />
      </div>
        <div class="trending-panel-album-details-container">
          <p class="trending-panel-album-details-title">Album Title</p>
          <p class="trending-panel-album-details-artist">Album Artist</p>
          <p class="trending-panel-album-details-trend">Trending in Local</p>
        </div>
      </div>
      <div class="trending-panel-pane" data-album-id="test">
      <div class="trending-panel-album-cover-container">
      <img
      src="./images/elbow-flying-dream-1-art.jpg"
      alt=""
      class="trending-panel-album-cover-image"
    />
      </div>
        <div class="trending-panel-album-details-container">
          <p class="trending-panel-album-details-title">Album Title</p>
          <p class="trending-panel-album-details-artist">Album Artist</p>
          <p class="trending-panel-album-details-trend">Trending in Local</p>
        </div>
      </div>
      <div class="trending-panel-pane" data-album-id="test">
      <div class="trending-panel-album-cover-container">
      <img
      src="./images/elbow-flying-dream-1-art.jpg"
      alt=""
      class="trending-panel-album-cover-image"
    />
      </div>
        <div class="trending-panel-album-details-container">
          <p class="trending-panel-album-details-title">Album Title</p>
          <p class="trending-panel-album-details-artist">Album Artist</p>
          <p class="trending-panel-album-details-trend">Trending in Local</p>
        </div>
      </div>
    </div>
`,
  },
  Collection: {
    classTitle: "collection-panel-settings-pane",
    html: `
  <div class="collection-search-container">
  <input
    type="text"
    class="collection-search-input"
    placeholder="Search Your Library"
  />
</div>
<div class="collection-panel-panes">
  <div class="collection-panel-pane" data-album-id="test">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="./images/fireman-electric-arguments-art.jpg"
        alt=""
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">Album Title</p>
      <p class="collection-panel-album-details-artist">Album Artist</p>
    </div>
  </div>
  <div class="collection-panel-pane" data-album-id="test">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="./images/fireman-electric-arguments-art.jpg"
        alt=""
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">Album Title</p>
      <p class="collection-panel-album-details-artist">Album Artist</p>
    </div>
  </div>
  <div class="collection-panel-pane" data-album-id="test">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="./images/fireman-electric-arguments-art.jpg"
        alt=""
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">Album Title</p>
      <p class="collection-panel-album-details-artist">Album Artist</p>
    </div>
  </div>
  <div class="collection-panel-pane" data-album-id="test">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="./images/fireman-electric-arguments-art.jpg"
        alt=""
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">Album Title</p>
      <p class="collection-panel-album-details-artist">Album Artist</p>
    </div>
  </div>
  <div class="collection-panel-pane" data-album-id="test">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="./images/fireman-electric-arguments-art.jpg"
        alt=""
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">Album Title</p>
      <p class="collection-panel-album-details-artist">Album Artist</p>
    </div>
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

const headlineSections = [
  {
    headlineSectionName: "Recents",
    headlineIcon: `<i
    class="fa-solid fa-clock"
    id="panel-header-icon"
    data-icon-text="Recents"
  ></i>`,
  },
  {
    headlineSectionName: "Shared",
    headlineIcon: `<i
    class="fa-solid fa-share"
    id="panel-header-icon"
    data-icon-text="Shared"
  ></i>`,
  },
  {
    headlineSectionName: "Shouted",
    headlineIcon: `<i
    class="fa-solid fa-bullhorn"
    id="panel-header-icon"
    data-icon-text="Shouted"
  ></i>`,
  },
];

// ELEMENTS
const navPanel = document.querySelector("#nav-panel");
const navItems = document.querySelectorAll(".nav-item");
const albumCards = document.querySelectorAll(".panel-item");
const albumModal = document.querySelector(".modal-album");
const optionsPanel = document.querySelector("#options-panel");

const loader = document.getElementById("loadingScreen");

const loading = new Event("loading");
const notLoading = new Event("done loading");

const contentPanels = document.querySelector(".content-panels");

// each content panel needs
// a div.panel-header
// a div.panel-items

// each panel-items needs
// a div.panel-item WITH a data-album-id attribute assigned via JS

// each panel-item, needs
// img.panel-item-art
// div.panel-item-description-container WITH
// p.panel-item-description-album-artist
// p.panel-item-description-album-title

async function populateAlbumPanels() {
  let iconHTMl = [];

  headlineSections.forEach((sectionObj) => {
    iconHTMl = [...iconHTMl, sectionObj.headlineIcon];
  });

  // headlineSections.forEach(section => { for (const [k, v] of Object.entries(section)) {i}})

  let albums = [];

  try {
    albums = await getAlbumCards();
  } catch (e) {
    console.error(e);
  }

  for (let i = 0; i < headlineSections.length; i++) {
    let contentPanel = document.createElement("div");
    contentPanel.className = "content-panel";

    let panelHeader = document.createElement("div");
    panelHeader.className = "panel-header";
    panelHeader.innerHTML = iconHTMl[i];

    let panelItems = document.createElement("div");
    panelItems.className = "panel-items";

    for (let album of albums) {
      let {
        id,
        name,
        artist,
        genre,
        tracks,
        albumLength,
        releaseDate,
        recordLabel,
        imageURL,
      } = album;

      let panelItem = document.createElement("div");
      panelItem.className = "panel-item";
      panelItem.setAttribute("data-album-id", id);

      let panelItemArt = document.createElement("img");
      panelItemArt.className = "panel-item-art";
      panelItemArt.setAttribute("src", imageURL);
      panelItemArt.setAttribute("alt", `Album cover for ${name}`);

      let panelItemDescContainer = document.createElement("div");
      panelItemDescContainer.className = "panel-item-description-container";

      let descriptionTextAlbumArtist = document.createElement("p");
      descriptionTextAlbumArtist.className =
        "panel-item-description-album-artist";
      descriptionTextAlbumArtist.textContent = `${artist}`;

      let descriptionTextAlbumTitle = document.createElement("p");
      descriptionTextAlbumTitle.className =
        "panel-item-description-album-title";
      descriptionTextAlbumTitle.textContent = `${name}`;

      [descriptionTextAlbumArtist, descriptionTextAlbumTitle].forEach((desc) =>
        panelItemDescContainer.appendChild(desc)
      );

      [panelItemArt, panelItemDescContainer].forEach((item) =>
        panelItem.appendChild(item)
      );

      panelItems.appendChild(panelItem);
    }

    [panelHeader, panelItems].forEach((elem) => contentPanel.appendChild(elem));
    contentPanels.appendChild(contentPanel);
  }

  async function getAlbumCards() {
    let localURL = `http://localhost:5000/api/albums/?limit=${4}`;
    let remoteURL = `https://album-api-project.onrender.com/api/albums`;

    loader.dispatchEvent(loading);

    let fetchedAlbums;

    try {
      let res = await fetch(localURL);
      fetchedAlbums = res.json();
      loader.dispatchEvent(notLoading);
    } catch (e) {
      throw new Error(e);
    }

    return fetchedAlbums;
  }
}

// contentPanels.forEach((contentPanel) => {
//   contentPanel.innerHTML = populateAlbumCard();
// });

let animDelay = 0.2;
let modalIsActive = false;

// LISTENERS
loader.addEventListener(
  "loading",
  (e) => {
    loader.classList.add("loading");
  },
  false
);

loader.addEventListener(
  "done loading",
  (e) => {
    loader.classList.remove("loading");
  },
  false
);

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

navPanel.addEventListener("mouseover", (e) => {
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

window.addEventListener("DOMContentLoaded", (e) => {
  populateAlbumPanels();
});

window.addEventListener("click", (e) => {
  if (e.target.parentElement.matches(".panel-item")) {
    let id = e.target.parentElement.getAttribute("data-album-id");
    populateModal(id);
    return;
  }

  if (
    e.target.parentElement.matches(".collection-panel-album-cover-container")
  ) {
    let id = e.target.parentElement.parentElement.getAttribute("data-album-id");
    closeOptionsPanel();
    populateModal(id);
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
