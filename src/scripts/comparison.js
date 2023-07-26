
// Function to fetch team statistics
async function fetchTeamStatistics(teamId, leagueId) {
   
    const season = "2022";

    console.log(teamId, season, leagueId)  
    
    //url for football-api
    //const url = `https://manuproxyserver.onrender.com/?url=https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${teamId}&league=${leagueId}`

    //url for rapid-api
    const url = `https://manuproxyserver.onrender.com/?team=${teamId}&season=${season}&league=${leagueId}&url=https://v3.football.api-sports.io/teams/statistics`;
     
    
    
    const options = {
        method: "GET"

        
    };

    try {
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to get the league ID for comparison based on the team ID
function getLeagueIdForComparison(teamId) {
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

    const leagueIds = {
        england: 39,
        germany: 78,
        spain: 140,
        italy: 135,
        france: 61,
    };

    // Get the team name from the teamId
    const teamName = Object.keys(teamIds).find((name) => teamIds[name] === Number(teamId));
    if (!teamName) {
        console.error(`Team ID '${teamId}' not found.`);
        return null;
    }

    // Determine the league ID based on the team name
    if (["arsenal", "chelsea", "liverpool", "manuntd", "mancity"].includes(teamName)) {
        return leagueIds.england;
    } else if (["olympique", "paris"].includes(teamName)) {
        return leagueIds.france;
    } else if (["bayern", "borussia"].includes(teamName)) {
        return leagueIds.germany;
    } else if (["juventus", "milan", "inter"].includes(teamName)) {
        return leagueIds.italy;
    } else if (["barcelona", "atletico", "madrid"].includes(teamName)) {
        return leagueIds.spain;
    }

    console.error(`League ID not found for Team ID '${teamId}'.`);
    return null;
}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId1 = urlParams.get("team1");
    const teamId2 = urlParams.get("team2");
    
    
    const leagueId1 = getLeagueIdForComparison(teamId1);
    const leagueId2 = getLeagueIdForComparison(teamId2);
    
    

    if (!teamId1 || !teamId2 || !leagueId1 || !leagueId2) {
        // If teamId1, teamId2, leagueId1 or leagueId2 is not provided, display an error message
        console.error("Invalid team IDs or league ID.");
        return;
    }

    // Fetch the statistics for both teams
    const team1Stats = await fetchTeamStatistics(teamId1, leagueId1);
    const team2Stats = await fetchTeamStatistics(teamId2, leagueId2);
    console.log(team1Stats);

    if (team1Stats.length < 1 || team2Stats < 1) {
        // If the data could not be fetched, display an error message
        console.error("Error fetching team statistics.");
        return;
    }

    // Display the comparison data on the page
    displayTeamStatistics(team1Stats, team2Stats);
});

//helper function to create a table with stats
function displayTeamStatistics(team1Stats, team2Stats) {
    const comparisonTable = document.getElementById("comparison-table");

    // Clear the existing comparison table
    comparisonTable.innerHTML = "";

    // Function to create a row with data
    function createRow(label, team1ValueHome, team1ValueAway, team1ValueTotal, team2ValueHome, team2ValueAway, team2ValueTotal) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="first-row">${label}</td>
            <td>${team1ValueHome}</td>
            <td>${team1ValueAway}</td>
            <td>${team1ValueTotal}</td>
            <td>${team2ValueHome}</td>
            <td>${team2ValueAway}</td>
            <td>${team2ValueTotal}</td>
        `;
        comparisonTable.appendChild(row);
    }

    // Team names row
    createRow("Team", team1Stats.team.name, team1Stats.team.name, "", team2Stats.team.name, team2Stats.team.name, "");

    // League row
    createRow("League", team1Stats.league.name, team1Stats.league.name, "", team2Stats.league.name, team2Stats.league.name, "");

    // Games Played row
    createRow("Games Played", team1Stats.fixtures.played.home, team1Stats.fixtures.played.away, team1Stats.fixtures.played.total, team2Stats.fixtures.played.home, team2Stats.fixtures.played.away, team2Stats.fixtures.played.total);

    // Wins row
    createRow("Wins", team1Stats.fixtures.wins.home, team1Stats.fixtures.wins.away, team1Stats.fixtures.wins.total, team2Stats.fixtures.wins.home, team2Stats.fixtures.wins.away, team2Stats.fixtures.wins.total);

    // Draws row
    createRow("Draws", team1Stats.fixtures.draws.home, team1Stats.fixtures.draws.away, team1Stats.fixtures.draws.total, team2Stats.fixtures.draws.home, team2Stats.fixtures.draws.away, team2Stats.fixtures.draws.total);

    // Losses row
    createRow("Losses", team1Stats.fixtures.loses.home, team1Stats.fixtures.loses.away, team1Stats.fixtures.loses.total, team2Stats.fixtures.loses.home, team2Stats.fixtures.loses.away, team2Stats.fixtures.loses.total);

    // Goals For row
    createRow("Goals For", team1Stats.goals.for.total.home, team1Stats.goals.for.total.away, team1Stats.goals.for.total.total, team2Stats.goals.for.total.home, team2Stats.goals.for.total.away, team2Stats.goals.for.total.total);

    // Goals Against row
    createRow("Goals Against", team1Stats.goals.against.total.home, team1Stats.goals.against.total.away, team1Stats.goals.against.total.total, team2Stats.goals.against.total.home, team2Stats.goals.against.total.away, team2Stats.goals.against.total.total);

    // Average Goals For row
    createRow("Average Goals For", team1Stats.goals.for.average.home, team1Stats.goals.for.average.away, team1Stats.goals.for.average.total, team2Stats.goals.for.average.home, team2Stats.goals.for.average.away, team2Stats.goals.for.average.total);

    // Average Goals Against row
    createRow("Average Goals Against", team1Stats.goals.against.average.home, team1Stats.goals.against.average.away, team1Stats.goals.against.average.total, team2Stats.goals.against.average.home, team2Stats.goals.against.average.away, team2Stats.goals.against.average.total);

    // Clean Sheets row
    createRow("Clean Sheets", team1Stats.clean_sheet.home, team1Stats.clean_sheet.away, team1Stats.clean_sheet.total, team2Stats.clean_sheet.home, team2Stats.clean_sheet.away, team2Stats.clean_sheet.total);
}

document.addEventListener("DOMContentLoaded", () => {
    // Map of team names to their respective team IDs
    const teamIds = {
        arsenal: 42,
        chelsea: 49,
        liverpool: 40,
        manuntd: 33,
        mancity: 50,
        olympique: 81,
        paris: 85,
        bayern: 157,
        borussia: 165,
        juventus: 496,
        milan: 489,
        inter: 505,
        barcelona: 529,
        atletico: 530,
        madrid: 541
    };

    // Add click event listeners to team icons
    const teamIcons = document.querySelectorAll(".team-icons img");
    teamIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            // Get the team name from the alt attribute of the clicked icon
            const teamName = icon.alt.toLowerCase();
            // Get the corresponding team ID from the teamIds object
            const teamId = teamIds[teamName];
            // Redirect to team.html with the teamId as a query parameter
            window.location.href = `team.html?id=${teamId}`;
        });
    });
});

