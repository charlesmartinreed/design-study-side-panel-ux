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
const searchModal = document.querySelector(".modal-search");
const searchInput = document.querySelector(".library-search-input");
const optionsPanel = document.querySelector("#options-panel");
const trackPlayerPanel = document.querySelector("#player-panel");

const loader = document.getElementById("loadingScreen");
const loading = new Event("loading");
const notLoading = new Event("done loading");

const contentPanels = document.querySelector(".content-panels");

const baseURLLocal = `http://localhost:5000`;
const baseURLRemote = `https://album-api-project.onrender.com`;

let modalIsActive = false;
let searchResults = [];

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

searchInput.addEventListener("keydown", async (e) => {
  let searchQuery = e.target.value;

  try {
    if (searchResults.length === 0) {
      searchResults = await fetchAlbumsFromAPI(null, null);
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (searchQuery.length >= 3) {
      handleSearchInputFor(searchQuery, searchResults);
    } else {
      removeModalChildren(searchModal);
    }
  }
});

// METHODS

function startLoaderAnimation() {
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
  for (const child of loader.children) {
    loader.removeChild(child);
  }

  loader.classList.remove("loading");
}

async function handleSearchInputFor(searchQuery, results) {
  if (!searchModal.classList.contains("active")) {
    toggleModal(searchModal);
  }

  searchQuery = searchQuery.toLowerCase();

  let albumResults = [];
  let songResults = [];

  if (!results) {
    createEmptyResultsCard();
  }

  if (results) {
    console.log("handling results");
    console.log(results);

    results.forEach((album) => {
      if (checkForMatch(searchQuery, album.name) === true) {
        albumResults.push(album);
      }
      // album.forEach((n) => {
      //   if (checkForMatch(searchQuery, n.name) === true) albumResults.push(n);
      // n.tracks.forEach((track) => {
      //   if (checkForMatch(searchQuery, track) === true) {
      //     songResults.push(n);
      //   }
      // });
      // });
      // albumResults = [album, ...albumResults];
      // songResults = [...album.tracks, ...songResults];
    });

    console.log("album results", albumResults);
    // console.log("album results", songResults);
  }

  function checkForMatch(searchQuery, testStr) {
    // console.log("checkformatch query", searchQuery);
    // console.log("checkformatch testStr", testStr);
    for (let i = 0; i < testStr.length; i += searchQuery.length) {
      let testSlice = testStr.slice(i, i + searchQuery.length);
      if (searchQuery === testSlice) {
        console.log("matched", searchQuery, testStr);
        console.log("current state of album results", albumResults);
        return true;
      }
    }
    return false;
  }

  function createEmptyResultsCard() {
    let resultDiv = document.createElement("div");
    resultDiv.className = `search-result-card`;

    let emptyResultsDiv = document.createElement("div");
    emptyResultsDiv.innerHTML = `<h1>No results found.</h1>`;
    resultDiv.appendChild(emptyResultsDiv);

    searchModal.appendChild(resultDiv);
  }

  function createSearchResultCard(result, type) {
    const resultTypes = {
      song: "song",
      album: "album",
    };

    let resultDiv = document.createElement("div");
    resultDiv.className = `search-result-card`;

    resultDiv.innerHTML = `
      <div class="search-result-title-container">
        <p class="">${result}</p>
      </div>
      <div class="search-result-type-container">
        <p class="search-result-type">${resultTypes.type}</p>
      </div>
    `;

    searchModal.appendChild(resultDiv);
  }

  async function updateSearchModal() {
    let fetched = null;

    try {
      fetched = await fetchAlbumsFromAPI(null, null);
    } catch (e) {
      console.log(e);
    } finally {
      return fetched;
    }
  }
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

    let currentState = parent.classList.contains("liked");
    attemptToUpdateAlbumState(id, parent, currentState);
  });
}

async function attemptToUpdateAlbumState(
  albumId,
  statefulElement,
  currentState
) {
  let stateWasUpdated = false;
  try {
    let res = await toggleAlbumInCollection(albumId, currentState);
    if (res.ok) stateWasUpdated = true;
    console.log("successfully update state");
  } catch (e) {
    console.error(e);
  } finally {
    if (!statefulElement) return;
    statefulElement.classList.toggle("liked", stateWasUpdated);
  }
}

async function toggleAlbumInCollection(id, currentState) {
  let URL = `${baseURLLocal}/api/album/${id}`;
  let data = { prop: "isFavorited", value: !currentState };

  try {
    let res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("attempting to update state");
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

      if (optionsPanel.classList.contains("active")) {
        closeOptionsPanel();
      }

      layoutOptionsPanel(sectionClass, sectionTitle);
      optionsPanel.classList.add("active");
    }
  });
});

async function fetchAlbumsFromAPI(limit = null, path = null) {
  console.log("fetching now");
  let baseURL = `${baseURLLocal}`;
  let fetchURL;

  if (!limit) limit = 8;

  if (path) {
    fetchURL = `${baseURL}/${path}`;
    // console.log("fetching from path", path);
  }

  if (!path) {
    fetchURL = `${baseURL}/api/albums/?limit=${limit}`;
    // console.log("fetching from path", fetchURL);
  }

  try {
    let res = await fetch(fetchURL);
    let data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
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

function listenForNewChildren(parentElement) {
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
  };

  const callback = (mutations) => {
    mutations.forEach((mutation) => {
      // trending-panel-settings-pane child
      if (mutation.type === "childList") {
        const children = Array.from(parentElement.children);

        for (const child of children) {
          if (child.classList.contains("trending-panel-settings-pane")) {
            let panes = document.querySelectorAll(".trending-panel-pane");
            activeTrendingPanes(panes);
          }

          if (child.classList.contains("collection-panel-settings-pane")) {
            let panes = document.querySelectorAll(".collection-panel-pane");
            handleCollectionPaneClicked(panes);
          }
        }
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(parentElement, config);
}

async function handleCollectionPaneClicked(panes) {
  panes.forEach((pane) => {
    let id = pane.dataset.albumId;
    let isFavorited = true;

    pane.addEventListener("click", async (e) => {
      if (e.target.matches("#play-button")) {
        fetchAndPlayAlbum(id);
      }

      if (e.target.matches("#unfav-button")) {
        console.log("unfav button clicked");
        await attemptToUpdateAlbumState(id, null, isFavorited);
        await layoutOptionsPanel(
          navPanelHTMLObjects["Collection"].classTitle,
          "Collection"
        );
      }
    });
  });
}

function activeTrendingPanes(panes) {
  panes.forEach((pane) =>
    pane.addEventListener("click", async (e) => {
      let id = pane.dataset.albumId;

      await fetchAndPlayAlbum(id);
    })
  );
}

async function fetchAndPlayAlbum(albumId) {
  let fetchedAlbum = await fetchAlbumsFromAPI(null, `api/album/${albumId}`);

  console.log(fetchedAlbum);

  let { imageURL, artist, tracks } = fetchedAlbum;

  updateCurrentTrackInPlayer({ imageURL, undefined, artist, tracks });
}

window.addEventListener("DOMContentLoaded", (e) => {
  // listen for trending panes
  listenForNewChildren(optionsPanel);

  populateAlbumPanels();
});

window.addEventListener("click", async (e) => {
  if (e.target.parentElement.matches(".panel-item")) {
    let id = e.target.parentElement.getAttribute("data-album-id");

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
    if (e.target.matches("body")) {
      modal = albumModal.classList.contains("active")
        ? albumModal
        : searchModal;

      console.log("modal is", modal);
      toggleModal(modal);
    }

    // console.log(e.target);
  }
});

// MODALS
function toggleModal(modal) {
  modalIsActive = !modalIsActive;

  modal.classList.toggle("active", modalIsActive);
  handleModalInForeground(modal);
}

function handleModalInForeground(modal) {
  let pageBody = document.querySelector("body");

  for (let child of pageBody.children) {
    if (modalIsActive) {
      if (modal.classList.contains("modal-album")) {
        if (!child.matches("#player-panel") && child !== modal) {
          blurBackgroundElements();
        }
      }

      if (modal.classList.contains("modal-search")) {
        if (
          !child.matches(".library-search-container") &&
          !child.matches("#player-panel") &&
          child !== modal
        ) {
          blurBackgroundElements();
        }
      }
    } else {
      unblurBackgroundElements();
    }

    function blurBackgroundElements() {
      child.style.pointerEvents = "none";
      child.style.filter = "blur(3px)";
      child.style.opacity = "0.1";
      pageBody.style.overflowY = "hidden";
    }

    function unblurBackgroundElements() {
      child.style.pointerEvents = "auto";
      child.style.filter = "none";
      child.style.opacity = "1";
      pageBody.style.overflow = "auto";

      if (child.classList.contains("modal-search")) {
        child.innerHTML = "";
        clearInput(searchInput);
        removeModalChildren(searchModal);
      }
    }
  }
}

function removeModalChildren(modal) {
  for (const child of modal.children) {
    modal.removeChild(child);
  }
}

function clearInput(inputElement) {
  inputElement.value = "";
}

async function layoutOptionsPanel(sectionClass, sectionTitle) {
  console.log("laying out panel");
  let sectionHTML = await generateSettingsPane(sectionTitle);

  let contentDiv = document.createElement("div");

  contentDiv.className = sectionClass;
  contentDiv.innerHTML = sectionHTML;

  optionsPanel.appendChild(contentDiv);

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
        break;
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

      let trendingAlbums = await fetchAlbumsFromAPI(
        null,
        "api/albums/trending"
      );

      let trackDetails;

      let innerPanelsHTML = ``;

      trendingAlbums.forEach(
        ({ name, artist, id, imageURL, isTrending, tracks }) => {
          let location = isTrending.locale;

          trackDetails = { imageURL, name, artist, tracks };

          let trendingPanelPane = document.createElement("div");
          trendingPanelPane.className = "trending-panel-pane";
          trendingPanelPane.setAttribute("data-album-id", id);

          trendingPanelPane.addEventListener("mouseover", async (e) =>
            console.log("clicked pane", e.target)
          );

          trendingPanelPane.innerHTML += `
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
        `;

          innerPanelsHTML += trendingPanelPane.outerHTML;
        }
      );

      let panesHTML = `
        <div class="trending-panel-panes">
          <div class="trending-pane-spacer"></div>
          <div class="trending-pane-wrapper">
          ${innerPanelsHTML}
          <div>
        </div>
      `;

      loader.dispatchEvent(notLoading);

      return panesHTML;
    }

    async function generateSocialPane() {
      let userCount = 6;

      let URL = `https://randomuser.me/api/?results=${userCount}`;

      loader.dispatchEvent(loading);

      async function getRandomAlbumAttributes() {
        let albums = await fetchAlbumsFromAPI();

        let { tracks, artist: trackArtist } =
          albums[Math.floor(Math.random() * albums.length)];

        let { title: track } =
          tracks[Math.floor(Math.random() * tracks.length)];

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
      let returnedHTML = "";

      if (collectedAlbums.length === 0) {
        innerPanelsHTML += `
        <img src="images/krzak-tumbleweed.gif" class="img-collection-empty"></img>
        `;

        returnedHTML = innerPanelsHTML;
      }

      if (collectedAlbums.length > 0) {
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
      <div class="collection-panel-album-ui-buttons">
        <i class="fa-solid fa-heart-crack" id="unfav-button"></i>
        <i class="fa-solid fa-play" id="play-button"></i>
      </div>
    </div>
        `;
        });

        returnedHTML = `
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
      }

      loader.dispatchEvent(notLoading);
      return returnedHTML;
    }
  }
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

    let trackBtns = modalMainDiv.querySelectorAll("#track-play-button");

    trackBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        let trackname = e.target.parentElement.textContent.trim();

        let { title } = album.tracks.find(({ title }) => title === trackname);

        let trackDetails = { imageURL, title, artist, tracks };
        updateCurrentTrackInPlayer(trackDetails);
      })
    );
  }
  loader.dispatchEvent(notLoading);

  toggleModal(albumModal);
}

function updateCurrentTrackInPlayer(trackDetails) {
  let { imageURL, title, artist, tracks } = trackDetails;

  if (title === undefined) title = tracks[0].title;

  let { length } = tracks.find(({ length }) => title === title);

  let currentTrackTime = "0:01";

  if (!trackPlayerPanel.classList.contains("playing-track"))
    trackPlayerPanel.classList.add("playing-track");

  // <i class="fa-solid fa-play" id="play-button"></i>
  // <i class="fa-solid fa-pause" id="pause-button"></i>

  let html = `
  <div>
    <img class="current-track-image" src="${imageURL}" />
  </div>
  <div>
    <p class="current-track-title">${title}</p>
    <p class="current-track-artist">${artist}</p>
  </div>
  <div class="player-playback-buttons">
    <i class="fa-solid fa-backward"></i>
    <i class="fa-solid fa-pause" id="pause-button"></i>
    <i class="fa-solid fa-forward"></i>
  </div>
  <div class="player-playback-bar-container">
    <div id="progress-bar"></div>
    <div id="progress-bar-time">
      <p id="player-track-time-string">${currentTrackTime} | ${length}</p>
    </div>
  </div>
  `;

  trackPlayerPanel.innerHTML = html;
  // console.log(trackPlayerPanel);
}
