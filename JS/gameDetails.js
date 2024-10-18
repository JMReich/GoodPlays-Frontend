
// This does not work because of CORS policy
// TODO: Connect to the backend to get around the CORS policy


function gameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const appid = urlParams.get('appid');
    const platform = urlParams.get('platform');

    console.log(appid);

    const fetchPromise = fetch("https://store.steampowered.com/api/appdetails?appids=" + appid, {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    });

    fetchPromise.then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Use text() to log the raw response
        })
        .then(text => {
            try {
                const data = JSON.parse(text); // Parse the JSON data
                var game = data[appid].data;
                var gameDetails = document.getElementById("game");
                gameDetails.innerHTML = "<h1>" + game.name + "</h1>" +
                    "<img src='" + game.header_image + "' alt='" + game.name + "'>" +
                    "<p>" + game.short_description + "</p>" +
                    "<p>Price: " + game.price_overview.final_formatted + "</p>" +
                    "<p>Platform: " + platform + "</p>" +
                    "<a href='" + game.website + "'>Website</a>";
            } catch (e) {
                console.error('Error parsing JSON:', e);
                console.log('Raw response:', text);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Call the function to load game details
gameDetails();