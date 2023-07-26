

// Function to make the API request and display team information

function getTeamIdFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function displayTeamInfo() {
    
    const teamId = getTeamIdFromQueryParams(); // Get the teamId from the URL query parameter

    if (!teamId) {
        // If teamId is not provided, display an error message or redirect back to index.html
        console.error("Team ID not found in URL query parameter.");
        return;
    }

    // football-api url
    fetch(`https://manuproxyserver.onrender.com/?url=https://v3.football.api-sports.io/teams?id=${teamId}`, {
    
    // rapid api url
    //fetch(`https://manuproxyserver.onrender.com/?url=https://api-football-beta.p.rapidapi.com/v3/teams?id=${teamId}`, {
        method: "GET"
        
        // headers: {
        //     "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        //     "x-rapidapi-key": apiKey,
        // },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const teamInfo = data.response[0]; // Access the 'team' object inside the response

            const teamName = teamInfo.team.name;
            const country = teamInfo.team.country;
            const venue = teamInfo.venue.name;
            const foundedYear = teamInfo.team.founded;
            const teamImage = teamInfo.team.logo;
            const stadiumCapacity = teamInfo.venue.capacity;
            const stadiumImage = teamInfo.venue.image;
            const city = teamInfo.venue.city;

            const teamInfoElement = document.getElementById("team-info");
            teamInfoElement.innerHTML = `
                <img src="${teamImage}" alt="logo">
                <h2>${teamName}</h2>
                <p>Country: ${country}</p>
                <p>Founded: ${foundedYear}</p>
                <h3>Stadium: ${venue}</h3>
                <p>Capacity: ${stadiumCapacity}</p>
                <img src="${stadiumImage}" alt="stadium">
                <p>City: ${city}</p>
                
            `;
        })
        .catch((err) => {
            console.log(err);
        });
}

document.addEventListener("DOMContentLoaded", displayTeamInfo);

function redirectToComparison(teamId1, teamId2) {
    // Redirect to comparison.html with the teamIds as query parameters
    window.location.href = `comparison.html?team1=${teamId1}&team2=${teamId2}`;
}

document.addEventListener("DOMContentLoaded", () => {
    // Map of team names to their respective team IDs
    const teamIds = {
        arsenal: 42,
        chelsea: 49,
        liverpool: 40,
        manuntd: 33,
        mancity: 50,
        borussia: 165,
        paris: 85,
        olympique: 81,
        inter: 505,
        milan: 489,
        juventus: 496,
        barcelona: 529,
        madrid: 541,
        atletico: 530,
    };

    // Add click event listeners to team icons
    const teamIcons = document.querySelectorAll(".team-icons img");
    teamIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            // Get the team name from the alt attribute of the clicked icon
            const teamName = icon.alt.toLowerCase();
            // Get the team ID of the team currently displayed in the team-info section
            const currentTeamId = getTeamIdFromQueryParams();

            if (teamName in teamIds && currentTeamId) {
                const teamId1 = currentTeamId;
                const teamId2 = teamIds[teamName];
                redirectToComparison(teamId1, teamId2);
            } else {
                console.error("Invalid team name or missing current team ID.");
            }
        });
    });
});