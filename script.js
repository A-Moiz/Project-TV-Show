const EPISODES_URL = "https://api.tvmaze.com/shows/82/episodes";
const SHOWS_URL = "https://api.tvmaze.com/shows";
// Array of episodes
let episodes = [];
let SHOWS = [];

// Get episodes count
const displayEps = document.getElementById("display-info");

// Get search input
const searchTerm = document.getElementById("search");

// Get select option
const select = document.getElementById("ep-select");
const showSelect = document.getElementById("show-select");

// Filters
searchTerm.addEventListener("keyup", applyFilters);
select.addEventListener("change", applyFilters);
showSelect.addEventListener("change", showChange);

// Fetch all shows
async function fetchShows() {
  const response = await fetch("https://api.tvmaze.com/shows");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = response.json();
  return data;
}

// Fetch all episodes
async function fetchEpisodes() {
  const response = await fetch("https://api.tvmaze.com/shows/82/episodes");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Filtering func
function applyFilters() {
  // Getting values of filters
  const query = searchTerm.value.toLowerCase();
  const selectedEp = select.value;

  // Creating new array
  let filteredEps = episodes;

  // Filter by search
  filteredEps = filteredEps.filter((ep) => {
    return (
      ep.name.toLowerCase().includes(query) ||
      (ep.summary || "").toLowerCase().includes(query)
    );
  });

  // Filter by dropdown
  if (selectedEp !== "all-episodes") {
    filteredEps = filteredEps.filter((ep) => ep.id === Number(selectedEp));
  }

  // Render again
  renderEpisodes(filteredEps);
}

// Creating each episode card
function createCard(episode) {
  const filmCard = document.getElementById("ep-card").content.cloneNode(true);

  const code = seasonAndEpisodeFormat(
    String(episode.season),
    String(episode.number),
  );

  const title = filmCard.querySelector("h3");
  const image = filmCard.querySelector("img");
  const summary = filmCard.querySelector("p");

  title.textContent = `${episode.name} - ${code}`;
  image.src = episode.image.medium;
  summary.innerHTML = episode.summary;

  return filmCard;
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
    container.appendChild(createCard(episode));
  }

  displayEps.textContent = `Displaying ${list.length} / ${episodes.length} episodes`;
}

// Populate ep options
function populateEpOptions() {
  select.innerHTML = `<option value="all-episodes">Show all episodes</option>`;

  episodes.forEach((ep) => {
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
async function showChange() {
  const showId = showSelect.value;
  displayEps.textContent = "Loading episodes...";

  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`,
    );
    const data = await response.json();

    episodes = data;
    searchTerm.value = "";
    populateEpOptions();
    renderEpisodes(episodes);
  } catch (error) {
    displayEps.textContent = `Error loading episodes for this show: ${error.message}. Please try again later.`;
  }
}

// Initialize
async function init() {
  displayEps.textContent = "Loading...";

  setTimeout(async function () {
    try {
      const allShows = await fetchShows();
      SHOWS = allShows;

      populateShowOptions();

      if (SHOWS.length > 0) {
        showSelect.value = SHOWS[0].id;
        await showChange();
      }
    } catch (error) {
      displayEps.textContent = `Error: ${error.message}. Please try again later.`;
    }
  }, 2000);
}

// Initial render
window.onload = init;
