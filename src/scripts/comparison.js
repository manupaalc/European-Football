
// Function to fetch team statistics
async function fetchTeamStatistics(teamId, leagueId) {
   
    const season = "2022";

    const url = `https://manuproxyserver.onrender.com/?url=https://api-football-v1.p.rapidapi.com/teams/statistics?team=${teamId}&season=${season}&league=${leagueId}`;
    const options = {
        method: "GET"
        // headers: {
        //     "X-RapidAPI-Key": apiKey,
        //     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        // },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to display team statistics
function displayTeamStatistics(team1Stats, team2Stats) {
    // Function to create a table row with two columns
    function createRowWithColumns(column1Data, column2Data) {
        const row = document.createElement("tr");
        const column1 = document.createElement("td");
        const column2 = document.createElement("td");
        column1.textContent = column1Data;
        column2.textContent = column2Data;
        row.appendChild(column1);
        row.appendChild(column2);
        return row;
    }

    // Clear the existing comparison table
    const comparisonTable = document.getElementById("comparison-table");
    comparisonTable.innerHTML = "";

    // Create a table row with team names
    const team1Name = team1Stats.team.name;
    const team2Name = team2Stats.team.name;
    const teamNamesRow = createRowWithColumns("Team", " ");
    teamNamesRow.classList.add("team-names");
    comparisonTable.appendChild(teamNamesRow);

    // Create a table row for league
    const leagueName = team1Stats.league.name;
    const leagueRow = createRowWithColumns("League", leagueName);
    comparisonTable.appendChild(leagueRow);

    // Create rows for each statistic
    const statistics = [
        { label: "Games Played", key: "total", unit: "" },
        { label: "Wins", key: "total", unit: "" },
        { label: "Draws", key: "total", unit: "" },
        { label: "Losses", key: "total", unit: "" },
        { label: "Goals For", key: "total", unit: "" },
        { label: "Goals Against", key: "total", unit: "" },
        { label: "Average Goals For", key: "average", unit: "" },
        { label: "Average Goals Against", key: "average", unit: "" },
        { label: "Clean Sheets", key: "total", unit: "" },
    ];

    statistics.forEach((stat) => {
        const statLabel = stat.label;
        const statKey = stat.key;
        const statUnit = stat.unit;

        const team1StatValue = team1Stats[statLabel.toLowerCase()].for[statKey].home;
        const team2StatValue = team2Stats[statLabel.toLowerCase()].for[statKey].home;

        const statRow = createRowWithColumns(statLabel, `${team1StatValue} - ${team2StatValue} ${statUnit}`);
        comparisonTable.appendChild(statRow);
    });
}


// Function to get the league ID for comparison based on the team ID
function getLeagueIdForComparison(teamId) {
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
        madrid: 541,
    };

    const leagueIds = {
        england: 39,
        germany: 78,
        spain: 140,
        italy: 135,
        france: 61,
    };

    // Determine the league ID based on the team ID
    if (teamId in teamIds) {
        const teamName = teamId.toLowerCase();
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
    }

    return null; // Return null if the team ID is not found
}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId1 = urlParams.get("team1");
    const teamId2 = urlParams.get("team2");
    const leagueId = getLeagueIdForComparison(teamId1);

    if (!teamId1 || !teamId2 || !leagueId) {
        // If teamId1, teamId2, or leagueId is not provided, display an error message
        console.error("Invalid team IDs or league ID.");
        return;
    }

    // Fetch the statistics for both teams
    const team1Stats = await fetchTeamStatistics(teamId1, leagueId);
    const team2Stats = await fetchTeamStatistics(teamId2, leagueId);

    if (!team1Stats || !team2Stats) {
        // If the data could not be fetched, display an error message
        console.error("Error fetching team statistics.");
        return;
    }

    // Display the comparison data on the page
    displayTeamStatistics(team1Stats, team2Stats);
});
