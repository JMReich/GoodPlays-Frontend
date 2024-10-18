// TODO: I like this, but I would prefer that it sends the user to
// a new page with the search results. This way the user can copy
// the search url and share it with others. 
// So, /search?search=gameName&platform=platform

// REST API get request to get games matching the search query
function searchGames() {
    var search = document.getElementById("gameName").value;
    var platform = document.getElementById("platform").value;
    var url = "http://127.0.0.1:8080/searchGames?search=" + search + "&platform=" + platform;

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
                gameElement.innerHTML = "<a href='game.html?appid=" + game.appid + "&platform=" + platform + "'><h2>" + game.name + "</h2>" +
                "<img src='" + game.headerImage + "' alt='" + game.name + "'></a>";
                gameList.appendChild(gameElement);
            }
        });
}

// Listen for the search button click
document.getElementById("searchButton").addEventListener("click", searchGames);