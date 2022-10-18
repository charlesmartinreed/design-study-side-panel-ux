const navPanelHTMLObjects = {
  Settings: {
    classTitle: "settings-panel-user-info",
    html: null,
  },
  Trending: {
    classTitle: "trending-panel-settings-pane",
    html: null,
  },
  Collection: {
    classTitle: "collection-panel-settings-pane",
    html: null,
  },
  Social: {
    classTitle: `social-panel-settings-pane`,
    html: null,
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

const baseURLLocal = `http://localhost:5000`;
const baseURLRemote = `https://album-api-project.onrender.com`;

let modalIsActive = false;

// LISTENERS
loader.addEventListener(
  "loading",
  (e) => {
    startLoaderAnimation();
  },
  false
);

loader.addEventListener(
  "done loading",
  (e) => {
    stopLoaderAnimation();
  },
  false
);

// METHODS

function startLoaderAnimation() {
  console.log("starting loader");
  for (let i = 1; i < 10; i++) {
    let animation = [
      { transform: `scaleY(1)` },
      { transform: `scaleY(${i * 0.5 + 0.5})` },
      { transform: `scaleY(-${i * 0.5 + 0.5})` },
    ];

    let timing = {
      duration: 1000,
      iterations: Infinity,
      direction: "alternate-reverse",
      delay: `${i * 25}`,
    };

    let loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loaderDiv");
    loader.appendChild(loadingDiv);

    loadingDiv.animate(animation, timing);
  }
  loader.classList.add("loading");
}

function stopLoaderAnimation() {
  console.log("stopping loader");
  for (const child of loader.children) {
    loader.removeChild(child);
  }

  loader.classList.remove("loading");
}

async function populateAlbumPanels() {
  loader.dispatchEvent(loading);

  for (let i = 0; i < headlineSections.length; i++) {
    let sectionName = headlineSections[i].headlineSectionName;
    let sectionIcon = headlineSections[i].headlineIcon;

    let contentPanel = document.createElement("div");
    contentPanel.className = "content-panel";

    let panelHeader = document.createElement("div");
    panelHeader.className = "panel-header";
    panelHeader.innerHTML = sectionIcon;

    let panelItems = document.createElement("div");
    panelItems.className = "panel-items";

    let albums = [];
    let limit = 3;

    try {
      albums = await fetchAlbumsFromAPI(limit, null);
    } catch (e) {
      console.error(e);
    } finally {
    }

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
        isFavorited,
      } = album;

      let panelItem = document.createElement("div");
      panelItem.className = "panel-item";
      panelItem.setAttribute("data-album-id", id);

      let panelFavContainer = document.createElement("div");
      panelFavContainer.className = "panel-item-fav-container";
      panelFavContainer.innerHTML = `<i class="fa-solid fa-heart" id="track-like-button"></i>`;
      panelFavContainer.classList.toggle("liked", isFavorited === true);
      panelItem.appendChild(panelFavContainer);

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

      handleFavContainer(panelFavContainer, id);

      panelItems.appendChild(panelItem);
    }

    [panelHeader, panelItems].forEach((elem) => contentPanel.appendChild(elem));
    contentPanels.appendChild(contentPanel);
  }

  loader.dispatchEvent(notLoading);
}

function handleFavContainer(container, id) {
  container.addEventListener("click", async (e) => {
    let parent = e.target.parentElement;
    // let grandparent = parent.parentElement;

    console.log(parent);
    // console.log(grandparent);

    // let id = grandparent.getAttribute("data-album-id");
    let currentState = parent.classList.contains("liked");
    console.log("before click liked state is", currentState);

    try {
      let res = await toggleAlbumInCollection(id, currentState);
      if (res.ok) currentState = !currentState;
    } catch (e) {
      console.error(e);
    } finally {
      parent.classList.toggle("liked", currentState);
    }
  });
}

async function toggleAlbumInCollection(id, currentState) {
  let URL = `${baseURLLocal}/api/album/${id}`;
  let data = { prop: "isFavorited", value: !currentState };
  console.log("sending data", data);

  try {
    let res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res;
  } catch (e) {
    console.error(e);
    throw new Error("failed to update collection");
  }
}

navItems.forEach((navItem) => {
  navItem.addEventListener("click", async (e) => {
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
      let sectionHTML = await generateSettingsPane(sectionTitle);

      if (optionsPanel.classList.contains("active")) {
        closeOptionsPanel();
      }

      layoutOptionsPanel(sectionClass, sectionHTML, sectionTitle);
      optionsPanel.classList.add("active");
    }
  });
});

async function generateSettingsPane(sectionTitle) {
  switch (sectionTitle) {
    case "Trending":
      return await generateTrendingPane();
    case "Social":
      return await generateSocialPane();
    case "Collection":
      return await generateCollectionPane();
    case "Settings":
      return generateSettings();
    default:
      return navPanelHTMLObjects[sectionTitle].html;
  }

  function generateSettings() {
    let html = `
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
</div>`;
    return html;
  }

  async function generateTrendingPane() {
    loader.dispatchEvent(loading);

    let trendingAlbums = await fetchAlbumsFromAPI(null, "api/albums/trending");

    let innerPanelsHTML = ``;

    trendingAlbums.forEach(({ name, artist, id, imageURL, isTrending }) => {
      let location = isTrending.locale;
      let panelHTML = `
      <div class="trending-panel-pane" data-album-id="${id}">
        <div class="trending-panel-album-cover-container">
          <img
          src="${imageURL}"
          alt="Cover of ${name} by ${artist}"
          class="trending-panel-album-cover-image"
        />
        </div>
        <div class="trending-panel-album-details-container">
          <p class="trending-panel-album-details-title">${name}</p>
          <p class="trending-panel-album-details-artist">${artist}</p>
          <p class="trending-panel-album-details-trend">Trending ${location}</p>
        </div>
      </div>
      `;
      innerPanelsHTML += panelHTML;
    });

    let returnedHTML = `
      <div class="trending-panel-panes">
        <div class="trending-pane-spacer"></div>
        <div class="trending-pane-wrapper">
        ${innerPanelsHTML}
        <div>
      </div>
    `;

    loader.dispatchEvent(notLoading);
    return returnedHTML;
  }

  async function generateSocialPane() {
    let userCount = 6;

    let URL = `https://randomuser.me/api/?results=${userCount}`;

    loader.dispatchEvent(loading);

    async function getRandomAlbumAttributes() {
      let albums = await fetchAlbumsFromAPI();

      let { tracks, artist: trackArtist } =
        albums[Math.floor(Math.random() * albums.length)];

      let { title: track } = tracks[Math.floor(Math.random() * tracks.length)];

      let { name: album, artist: albumArtist } =
        albums[Math.floor(Math.random() * albums.length)];

      return { track, trackArtist, album, albumArtist };
    }

    let usersData;

    try {
      let res = await fetch(URL);
      usersData = await res.json();
    } catch (e) {
      console.error(e);
    }

    let panelsHTML = "";

    for (let i = 0; i < userCount; i++) {
      let user = usersData["results"][i];
      let {
        name: { first, last },
        picture: { medium },
      } = user;
      let { track, trackArtist, album, albumArtist } =
        await getRandomAlbumAttributes();

      let html = `
        <div class="social-panel">
        <div class="social-panel-image">
          <img
            class="social-panel-friend-image"
            src="${medium}"
            alt=""
          />
        </div>
        <div class="social-panel-details">
          <p class="social-panel-friend-name">
            <a href="#!">${first} ${last}</a>
          </p>
          <p class="social-panel-last-listened-song">
            Last Listened to <span>${track} by ${trackArtist}</span>
          </p>
          <p class="social-panel-last-favorited-item">
            Last Favorited <span>${album} by ${albumArtist}</span>
          </p>
        </div>
      </div>
        `;
      panelsHTML += html;
    }

    loader.dispatchEvent(notLoading);

    return panelsHTML;
  }

  async function generateCollectionPane() {
    loader.dispatchEvent(loading);

    let albums = await fetchAlbumsFromAPI();

    let collectedAlbums = albums.filter(
      ({ isFavorited }) => isFavorited === true
    );

    let innerPanelsHTML = ``;

    collectedAlbums.forEach(({ id, name, artist, imageURL }) => {
      innerPanelsHTML += `
      <div class="collection-panel-pane" data-album-id="${id}">
    <div class="collection-panel-album-cover-container">
      <img
        class="collection-panel-album-cover-image"
        src="${imageURL}"
        alt="Cover art for ${name} by ${artist}"
      />
    </div>
    <div class="collection-panel-album-details-container">
      <p class="collection-panel-album-details-title">${name}</p>
      <p class="collection-panel-album-details-artist">${artist}</p>
    </div>
  </div>
      `;
    });

    let returnedHTML = `
      <div class="collection-search-container">
      <input
      type="text"
      class="collection-search-input"
      placeholder="Search Your Library"
    />
      </div>
      <div class="collection-panel-panes">
        <div class="collection-pane-wrapper">
          ${innerPanelsHTML}
        </div>
      </div>
    `;

    loader.dispatchEvent(notLoading);
    return returnedHTML;
  }
}

async function fetchAlbumsFromAPI(limit = null, path = null) {
  let baseURL = `${baseURLLocal}`;
  let fetchURL;

  if (!limit) limit = 8;

  if (path) {
    fetchURL = `${baseURL}/${path}`;
  }

  if (!path) {
    fetchURL = `${baseURLLocal}/api/albums/?limit=${limit}`;
  }

  try {
    // loader.dispatchEvent(loading);
    // console.log("fetching from URL", fetchURL);

    let res = await fetch(fetchURL);
    let data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  } finally {
    // loader.dispatchEvent(notLoading);
  }
}

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
  for (const child of optionsPanel.children) {
    optionsPanel.removeChild(child);
  }

  optionsPanel.classList.remove("active");
  optionsPanel.innerHTML = "";
}

window.addEventListener("DOMContentLoaded", (e) => {
  populateAlbumPanels();
  // loader.dispatchEvent(loading);
});

window.addEventListener("click", async (e) => {
  if (e.target.parentElement.matches(".panel-item")) {
    let id = e.target.parentElement.getAttribute("data-album-id");

    console.log(e.target);
    await populateModal(id);
    return;
  }

  if (
    e.target.parentElement.matches(".collection-panel-album-cover-container")
  ) {
    let id = e.target.parentElement.parentElement.getAttribute("data-album-id");
    closeOptionsPanel();
    await populateModal(id);
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
}

async function populateModal(albumID) {
  loader.dispatchEvent(loading);

  let URL = `${baseURLLocal}/api/album/${albumID}`;
  let album;

  try {
    let res = await fetch(URL);
    album = await res.json();
  } catch (e) {
    console.error();
  }

  generateModal(album);

  function generateModal(album) {
    albumModal.innerHTML = ``;

    let {
      id,
      imageURL,
      name,
      artist,
      genre,
      tracks,
      albumLength,
      releaseDate,
      recordLabel,
      isFavorited,
    } = album;

    // releaseDate = new Intl.DateTimeFormat("en-US").format(releaseDate);

    let modalDetailsDiv = document.createElement("div");
    modalDetailsDiv.className = "modal-details";

    let modalAlbumArtDiv = document.createElement("div");
    modalAlbumArtDiv.className = "modal-album-art";

    let modalFavContainer = document.createElement("div");
    modalFavContainer.className = "modal-fav-container";

    modalFavContainer.classList.toggle("liked", isFavorited === true);

    modalFavContainer.innerHTML = `<i class="fa-solid fa-heart" id="track-like-button"></i>
    </div>`;

    modalAlbumArtDiv.innerHTML = `
    <img
    src="${imageURL}"
    alt="Album cover for ${name} by ${artist}"
    title="Album cover for ${name} by ${artist}"
  />
    `;

    modalAlbumArtDiv.appendChild(modalFavContainer);

    let modalAlbumDescDiv = document.createElement("div");
    modalAlbumDescDiv.className = "modal-album-description";
    modalAlbumDescDiv.innerHTML = `
    <div>
      <p>${name}</p>
      <p>${artist}</p>
      <p>${genre}</p>
    </div>
    <div>
      <p>${tracks.length} tracks</p>
      <p>${albumLength}</p>
      <p>${releaseDate}</p>
      <p>${recordLabel}</p>
    </div>
    `;

    let modalMainDiv = document.createElement("div");
    modalMainDiv.className = "modal-main";

    handleFavContainer(modalFavContainer, id);

    tracks.forEach(({ title, length, isFavorited }) => {
      let modalTrackItemDiv = document.createElement("div");
      modalTrackItemDiv.className = "modal-main-track-item";

      modalTrackItemDiv.innerHTML = `
      <div>
        <i class="fa-solid fa-play" id="track-play-button"></i>
        <p>${title}</p>
      </div>
      <div>
        <p>${length}</p>
      </div>
    <div>
      <i class="fa-solid fa-heart" id="track-like-button"></i>
    </div>
      `;

      modalMainDiv.appendChild(modalTrackItemDiv);
    });

    [modalAlbumArtDiv, modalAlbumDescDiv].forEach((child) =>
      modalDetailsDiv.appendChild(child)
    );

    [modalDetailsDiv, modalMainDiv].forEach((modal) =>
      albumModal.appendChild(modal)
    );
  }
  loader.dispatchEvent(notLoading);

  toggleModal();
}

function handleModalInForeground() {
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
