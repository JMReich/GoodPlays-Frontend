

// REST API get request to get games matching the search query
function searchGames() {
    var search = document.getElementById("gameName").value;
    var platform = document.getElementById("platform").value;
    var url = "http://localhost:8080/searchGames?search=" + search + "&platform=" + platform;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var games = data;
            var gameList = document.getElementById("gameList");
            gameList.innerHTML = "";
            for (var i = 0; i < games.length; i++) {
                var game = games[i];
                var gameElement = document.createElement("div");
                gameElement.className = "game";
                gameElement.innerHTML = "<h2>" + game.name + "</h2>" +
                gameList.appendChild(gameElement);
            }
        });
}

// Listen for the search button click
document.getElementById("searchButton").addEventListener("click", searchGames);