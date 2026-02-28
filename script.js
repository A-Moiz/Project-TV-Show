//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  createCard(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

function createCard(episodeList) {
  // Card component
  const mainContainer = document.getElementById("main-container");

  for (let i = 0; i < episodeList.length; i++) {
    const cardComponent = document.createElement("section");

    // Episode name
    const episodeName = episodeList[i].name;

    // Season + Episode
    const seasonNumString = String(episodeList[i].season).padStart(2, "0");
    const episodeNumString = String(episodeList[i].number).padStart(2, "0");

    // title element
    const title = document.createElement("h3");
    title.textContent = `${episodeName} - S${seasonNumString}E${episodeNumString}`;

    // Image URL
    const imageURL = episodeList[i].image.medium;

    // image element
    const image = document.createElement("img");
    image.src = imageURL;
    image.alt = episodeName;

    // p element
    const description = document.createElement("p");
    description.textContent = String(episodeList[i].summary).replace(
      /[</p>]/g,
      "",
    );

    // CSS
    cardComponent.classList.add("episode-card");

    // Append elements to card
    cardComponent.appendChild(title);
    cardComponent.appendChild(image);
    cardComponent.appendChild(description);

    // Append card to main container
    mainContainer.appendChild(cardComponent);

    // Add card to page
    document.body.appendChild(mainContainer);
  }
}

window.onload = setup;
