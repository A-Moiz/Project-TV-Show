// URLs
let EPISODES_URL = "https://api.tvmaze.com/shows/82/episodes";
let SHOWS_URL = "https://api.tvmaze.com/shows";

// Cache for all episodes
const EPISODE_CACHE = {};

// Array of episodes
let EPISODES = [];
let SHOWS = [];

// Elements
const displayEps = document.getElementById("display-info");
const searchTerm = document.getElementById("search");
const select = document.getElementById("ep-select");
const showSelect = document.getElementById("show-select");
const backToShows = document.querySelector(".back-to-shows");

// Event listeners
searchTerm.addEventListener("keyup", applyFilters);
select.addEventListener("change", applyFilters);
showSelect.addEventListener("change", showChange);
backToShows.addEventListener("click", showAllShows);

// Go back to all shows by hiding ep view and un-hiding shows view
function showAllShows() {
  window.scrollTo(0, 0);
  document.getElementById("ep-view").style.display = "none";
  document.getElementById("ep-select").style.display = "none";
  document.querySelector(".back-to-shows").style.display = "none";
  document.querySelector(".show-container").style.display = "";
  document.querySelector(".show-select").style.display = "none";
  searchTerm.value = "";
  renderShows(SHOWS);
}

// Fetch all shows
async function fetchShows() {
  const response = await fetch(SHOWS_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  return data.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );
}

// Fetch all episodes
async function fetchEpisodes() {
  const response = await fetch(EPISODES_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Filtering func
function applyFilters() {
  const query = searchTerm.value.toLowerCase();
  const showContainer = document.querySelector(".show-container");

  if (showContainer.style.display !== "none") {
    // Filter Shows
    const filteredShows = SHOWS.filter(
      (show) =>
        show.name.toLowerCase().includes(query) ||
        show.genres.join(" ").toLowerCase().includes(query) ||
        show.summary.toLowerCase().includes(query),
    );
    renderShows(filteredShows);
  } else {
    // Filter Episodes
    const selectedEp = select.value;
    let filteredEps = EPISODES.filter(
      (ep) =>
        ep.name.toLowerCase().includes(query) ||
        (ep.summary || "").toLowerCase().includes(query),
    );
    if (selectedEp !== "all-episodes") {
      filteredEps = filteredEps.filter((ep) => ep.id === Number(selectedEp));
    }
    renderEpisodes(filteredEps);
  }
}

// Creating each episode card
function createEpCard(episode) {
  const epCard = document.getElementById("ep-card").content.cloneNode(true);

  const code = seasonAndEpisodeFormat(
    String(episode.season),
    String(episode.number),
  );

  const title = epCard.querySelector("h2");
  const image = epCard.querySelector("img");
  const summary = epCard.querySelector("p");

  title.textContent = `${episode.name} - ${code}`;
  image.src = episode.image.medium || "./images/no-image.png";
  image.alt = `${episode.name} (${code})`;
  summary.innerHTML =
    episode.summary || "No summary available for this episode.";

  return epCard;
}

// Creating each show card
function createShowCard(show) {
  const showCard = document.getElementById("show-card").content.cloneNode(true);
  const showSection = showCard.querySelector(".show-section");

  const title = showCard.querySelector(".show-title");
  const image = showCard.querySelector(".show-img");
  const summary = showCard.querySelector(".show-summary");
  const genres = showCard.querySelector(".show-genres");
  const status = showCard.querySelector(".show-status");
  const rating = showCard.querySelector(".show-rating");
  const runtime = showCard.querySelector(".show-runtime");

  title.textContent = show.name;
  image.src = show.image.medium || "./images/no-image.png";
  image.alt = show.name;
  summary.innerHTML = show.summary;

  genres.textContent = show.genres.join(", ");
  status.textContent = show.status;
  rating.textContent = show.rating.average;
  runtime.textContent = show.runtime;

  showSection.addEventListener("click", () => {
    showSelect.value = show.id;
    showChange();
  });

  return showCard;
}

// Formatting season and episode
function seasonAndEpisodeFormat(season, episode) {
  season = season.padStart(2, "0");
  episode = episode.padStart(2, "0");
  return `S${season}E${episode}`;
}

// Rendering episodes
function renderEpisodes(list) {
  const container = document.querySelector(".ep-container");
  const template = document.getElementById("ep-card");

  container.innerHTML = "";
  container.appendChild(template);

  for (const episode of list) {
    container.appendChild(createEpCard(episode));
  }

  displayEps.textContent = `Displaying ${list.length} / ${EPISODES.length} episodes`;
}

// Rendering shows
function renderShows(list) {
  const container = document.querySelector(".show-container");
  const template = document.getElementById("show-card");

  container.innerHTML = "";
  container.appendChild(template);

  for (const show of list) {
    container.appendChild(createShowCard(show));
  }

  displayEps.textContent = `Found ${list.length} / ${SHOWS.length} shows`;
}

// Populate ep options
function populateEpOptions() {
  select.innerHTML = `<option value="all-episodes">Show all episodes</option>`;

  EPISODES.forEach((ep) => {
    const option = document.createElement("option");
    const code = seasonAndEpisodeFormat(String(ep.season), String(ep.number));
    option.value = ep.id;
    option.textContent = `${code} - ${ep.name}`;
    select.appendChild(option);
  });
}

// Populate select with show options
function populateShowOptions() {
  showSelect.innerHTML = "";

  SHOWS.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });

  populateEpOptions();
}

// Handling show change
async function showChange() {
  window.scrollTo(0, 0);
  const showId = showSelect.value;
  const showContainer = document.querySelector(".show-container");
  const epView = document.getElementById("ep-view");

  if (EPISODE_CACHE[showId]) {
    EPISODES = EPISODE_CACHE[showId];
    updateUIForEpisodes();
    return;
  }

  displayEps.textContent = "Loading episodes...";
  try {
    const response = await fetch(`${SHOWS_URL}/${showId}/episodes`);
    const data = await response.json();

    EPISODE_CACHE[showId] = data;
    EPISODES = data;
    updateUI();
  } catch (error) {
    displayEps.textContent = `Error: ${error.message}`;
  }
}

// Updating UI
function updateUI() {
  const showContainer = document.querySelector(".show-container");
  const epView = document.getElementById("ep-view");

  searchTerm.value = "";
  showContainer.style.display = "none";
  document.querySelector(".back-to-shows").style.display = "";
  epView.style.display = "block";
  document.getElementById("ep-select").style.display = "";

  populateEpOptions();
  renderEpisodes(EPISODES);
}

// Initialize
async function init() {
  displayEps.textContent = "Loading...";
  document.getElementById("ep-view").style.display = "none";
  document.querySelector(".ep-select").style.display = "none";
  document.querySelector(".back-to-shows").style.display = "none";
  document.querySelector(".show-select").style.display = "none";

  setTimeout(async function () {
    try {
      const allShows = await fetchShows();
      SHOWS = allShows;

      populateShowOptions();
      renderShows(SHOWS);
      displayEps.textContent = `Found ${SHOWS.length} shows`;
    } catch (error) {
      displayEps.textContent = `Error: ${error.message}`;
    }
  }, 1000);
}

// Initial render
window.onload = init;
