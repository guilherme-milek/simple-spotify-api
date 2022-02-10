const searchBox = document.querySelector("input");
const searchButton = document.querySelector("#search");
const list = document.querySelector("ul");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  getMusics(searchBox.value);
});

const getMusics = (search) => {
  fetch(`http://localhost:3000/tracks?search=${search}`)
    .then((response) => response.json())
    .then((response) => {
      response.data.map((music) => {
        const li = document.createElement("li");
        const name = document.createElement("span");
        const player = document.createElement("audio");
        player.setAttribute("controls", "");

        const source = document.createElement("source");
        source.src = music.music_url;

        player.appendChild(source);

        name.innerText = music.name;
        li.appendChild(name);
        li.appendChild(player);

        list.append(li);
      });
    });
};
