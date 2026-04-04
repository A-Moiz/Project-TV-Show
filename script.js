//You can edit ALL of the code here
let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();

  createCard(allEpisodes);
  makePageForEpisodes(allEpisodes);
  populateSelector();

  const searchInput = document.getElementById("searchInput");
  const select = document.getElementById("episodeSelect");

  // Search filter
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    const filtered = allEpisodes.filter((ep) => {
      return (
        ep.name.toLowerCase().includes(term) ||
        (ep.summary || "").toLowerCase().includes(term)
      );
    });

    createCard(filtered);
    makePageForEpisodes(filtered);
  });

  // Dropdown filter
  select.addEventListener("change", () => {
    const selectedId = select.value;

    if (!selectedId) {
      createCard(allEpisodes);
      makePageForEpisodes(allEpisodes);
      return;
    }

    const selectedEpisode = allEpisodes.find((ep) => ep.id == selectedId);

    createCard([selectedEpisode]);
    makePageForEpisodes([selectedEpisode]);
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = `Displaying ${episodeList.length} / ${allEpisodes.length} episodes`;
}

function createCard(episodeList) {
  const mainContainer = document.getElementById("main-container");

  // Clear
  mainContainer.innerHTML = "";

  for (let i = 0; i < episodeList.length; i++) {
    const ep = episodeList[i];

    const cardComponent = document.createElement("section");

    const seasonNumString = String(ep.season).padStart(2, "0");
    const episodeNumString = String(ep.number).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = `${ep.name} - S${seasonNumString}E${episodeNumString}`;

    const image = document.createElement("img");
    image.src = ep.image?.medium || "";
    image.alt = ep.name;

    const description = document.createElement("p");

    description.innerHTML = ep.summary || "No summary available";

    cardComponent.classList.add("episode-card");

    cardComponent.appendChild(title);
    cardComponent.appendChild(image);
    cardComponent.appendChild(description);

    mainContainer.appendChild(cardComponent);
  }
}

// Add options
function populateSelector() {
  const select = document.getElementById("episodeSelect");

  allEpisodes.forEach((ep) => {
    const option = document.createElement("option");

    const code = `S${String(ep.season).padStart(2, "0")}E${String(
      ep.number,
    ).padStart(2, "0")}`;

    option.value = ep.id;
    option.textContent = `${code} - ${ep.name}`;

    select.appendChild(option);
  });
}

window.onload = setup;
