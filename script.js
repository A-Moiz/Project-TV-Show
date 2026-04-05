// Get all episodes
const episodes = getAllEpisodes();

// Get episodes count
const displayEps = document.getElementById("display-info");

// Get search input
const searchTerm = document.getElementById("search");

// Get select option
const select = document.getElementById("ep-select");

// Filters
searchTerm.addEventListener("keyup", applyFilters);
select.addEventListener("change", applyFilters);

// Filtering func
function applyFilters() {
  const query = searchTerm.value.toLowerCase();
  const selectedID = select.value;

  let filtered = episodes;

  // Filter by search
  filtered = filtered.filter(
    (ep) =>
      ep.name.toLowerCase().includes(query) ||
      (ep.summary || "").toLowerCase().includes(query),
  );

  // Filter by dropdown
  if (selectedID !== "all") {
    filtered = filtered.filter((ep) => ep.id === Number(selectedID));
  }

  renderEpisodes(filtered);
}

// Creating each episode card
function createCard(episode) {
  const filmCard = document.getElementById("ep-card").content.cloneNode(true);

  const [seasonNum, episodeNum] = seasonAndEpisodeFormat(
    String(episode.season),
    String(episode.number),
  );

  const title = filmCard.querySelector("h3");
  const image = filmCard.querySelector("img");
  const summary = filmCard.querySelector("p");

  title.textContent = `${episode.name} - S${seasonNum}E${episodeNum}`;
  image.src = episode.image.medium;
  summary.innerHTML = episode.summary;

  return filmCard;
}

// Formatting season and episode
function seasonAndEpisodeFormat(season, episode) {
  season = season.padStart(2, "0");
  episode = episode.padStart(2, "0");
  return [season, episode];
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

// Populate options
function populateOptions() {
  episodes.forEach((ep) => {
    const option = document.createElement("option");
    const [seasonNum, episodeNum] = seasonAndEpisodeFormat(
      String(ep.season),
      String(ep.number),
    );
    const code = `S${seasonNum}E${episodeNum}`;
    option.value = ep.id;
    option.textContent = `${code} - ${ep.name}`;
    select.appendChild(option);
  });
}

// Initialize
function init() {
  renderEpisodes(episodes);
  populateOptions();
}

// Initial render
window.onload = init();
