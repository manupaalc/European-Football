
let countrySelected = false;
let svg;
let selectDifferentBtn;



document.addEventListener('DOMContentLoaded', () => {
  
    const highlightedCountries = ['Spain', 'Italy', 'France', 'Germany', 'United Kingdom'];
    let selectedCountry = null;
    

    // Fetch the GeoJSON data using the Fetch API
    fetch('../assets/europe_features.json')
        .then((response) => response.json())
        .then((europeJSON) => {
            const mapContainer = document.getElementById('map-container');

            // Create an SVG element for the map
            svg = d3.select(mapContainer).append('svg');


           
            // Set the SVG dimensions
            const width = 800;
            const height = 600;
            svg.attr('width', width).attr('height', height);

            // Create a new group element (g) for the map paths
            const mapGroup = svg.append('g');

            // Draw the map using D3.js and the 'europeJSON' data
            const projection = d3.geoMercator().fitSize([width, height], europeJSON);
            const path = d3.geoPath().projection(projection);

            const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

            svg.call(zoom);

            function zoomed(event) {
                // Apply the zoom transformation to the mapGroup (g element)
                mapGroup.attr('transform', event.transform);
                mapGroup.attr('stroke-width', 1 / event.transform.k); // To maintain stroke width while zooming
            }

            // Define a function to reset the fill color of the map paths to "lightgreen"
            function resetMapColors() {
                mapGroup
                    .selectAll('path')
                    .attr('fill', (feature) => {
                        // Check if the current country is in the highlightedCountries array
                        if (highlightedCountries.includes(feature.properties.name)) {
                            return 'lightgreen'; // Apply lightgreen color for the highlighted countries
                        } else {
                            return 'gray'; // Apply gray color for other countries
                        }
                    });
                }

            mapGroup
                .selectAll('path')
                .data(europeJSON.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('stroke', 'black')
                .attr('fill', (feature) => {
                    // Check if the current country is in the highlightedCountries array
                    if (highlightedCountries.includes(feature.properties.name)) {
                        return 'lightgreen'; // Apply lightblue color for the highlighted countries
                    } else {
                        return 'gray'; // Apply gray color for other countries
                    }
                })
                .style('cursor', (feature) => {
                    // Set the cursor to "pointer" for the highlighted countries
                    return highlightedCountries.includes(feature.properties.name) ? 'pointer' : 'default';
                })
                // .on('mouseover', function (event, feature) {
                //     // Change the fill color on hover
                //     if (highlightedCountries.includes(feature.properties.name)) {
                //         d3.select(this).attr('fill', 'lightblue'); // Apply lightblue color on hover for highlighted countries
                //     }
                // })
                // .on('mouseout', function () {
                //     // Restore the default fill color when not hovered
                //     d3.select(this).attr('fill', (feature) => {
                //         if (highlightedCountries.includes(feature.properties.name)) {
                //             return 'lightgreen'; // Apply lightblue color for highlighted countries
                //         } else {
                //             return 'gray'; // Apply gray color for other countries
                //         }
                //     });
                // })
                .on('click', function (event, feature) {
                    // Check if the clicked country is in the highlightedCountries array
                    if (highlightedCountries.includes(feature.properties.name)) {
                        // Zoom in on click for the highlighted countries
                        if(selectedCountry) resetMapColors();
                        const [[x0, y0], [x1, y1]] = path.bounds(feature); // Get the bounding box of the clicked country
                        const [cx, cy] = [(x0 + x1) / 2, (y0 + y1) / 2]; // Calculate the centroid of the bounding box
                        const scale = 3; // Set the desired scale factor for zooming in
                        countrySelected = true;
                        if (feature.properties.name === 'United Kingdom'){
                            selectedCountry = 'England';
                        } else {
                            selectedCountry = feature.properties.name;
                        }
                        

                        // Calculate the translation to keep the clicked country centered
                        const translate = [width / 2 - scale * cx, height / 2 - scale * cy];

                        // Apply the zoom transformation to the mapGroup (g element) with transition
                        mapGroup
                            .transition()
                            .duration(750)
                            .attr('transform', `translate(${translate[0]}, ${translate[1]}) scale(${scale})`);

                        // Change color on click
                        mapCountry = d3.select(this);
                        mapCountry.attr('fill', 'green');
                        const message = document.getElementById('message');
                        const datesForm = document.getElementById('dates-form');
                        if (selectedCountry) {
                            message.innerHTML = `<p>Select the dates for your trip to ${selectedCountry}.</p>`;
                            datesForm.style.display = 'block';
                        } else {
                            message.innerHTML = `<p>Select the country for your next trip.</p>`;
                            datesForm.style.display = 'none';
                        }
                    }
                    // Add the select another country button to the page
                    selectDifferentBtn = document.createElement('button'); // Initialize the button here
                    selectDifferentBtn.textContent = 'Select a different country';
                    selectDifferentBtn.addEventListener('click', () => {
                        // Reset the map to its initial position
                        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);

                        // Reset selectedCountry and countrySelected to null
                       
                        mapCountry.attr('fill', 'lightgreen');
                        mapCountry = null;
                        selectedCountry = null;
                        countrySelected = false;

                        

                        // Reset the message and dates form
                        const message = document.getElementById('message');
                        const datesForm = document.getElementById('dates-form');
                        message.innerHTML = '<p>Select the country for your next trip.</p>';
                        datesForm.style.display = 'none';
                        // Remove the 'Select a different country' button
                        selectDifferentBtn.remove();
                    });
                    //console.log(countrySelected)
                    if (countrySelected) document.getElementById('map-container').appendChild(selectDifferentBtn);
                    
          
            });
            //console.log(selectedCountry)
            
            
        })
        .catch((error) => {
            console.error('Error fetching JSON:', error);
        });

   

        // Function to load JSON data for the selected country's teams
    async function loadCountryTeamCalendars(selectedCountry) {
        const teamFiles = {
            'Spain': ['atletico.json', 'barcelona.json', 'madrid.json'],
            'England': ['arsenal.json', 'chelsea.json', 'liverpool.json', 'mancity.json', 'manutd.json'],
            'France': ['paris.json', 'oliympique.json'],
            'Italy': ['inter.json', 'juventus.json', 'milan.json'],
            'Germany': ['bayern.json', 'borussia.json']
        };

        const teamCalendars = [];
        try {
            if (selectedCountry in teamFiles) {
                const countryTeams = teamFiles[selectedCountry];
                for (const teamFile of countryTeams) {
                    const response = await fetch(`../assets/calendars/${selectedCountry}/${teamFile}`);
                    const teamCalendar = await response.json();
                    teamCalendars.push(teamCalendar);
                }
            } else {
                console.error('No team calendars found for the selected country.');
            }
            return teamCalendars;
        } catch (error) {
            console.error('Error fetching team calendars:', error);
            return [];
        }
    }

    // get the user trip dates
    // Submit event listener for the dates form
    const tripForm = document.getElementById('trip-form');
    const datesForm = document.getElementById('dates-form');
    tripForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        if (selectedCountry && startDate && endDate) {
            // Display the trip info
            datesForm.style.display = 'none'; // Hide the dates form
            const tripMessage = `In ${selectedCountry} from ${startDate} to ${endDate}, there will be the next games:`;
            document.getElementById('message').innerText = tripMessage;

            // Load JSON data for the selected country's teams
            const teamCalendars = await loadCountryTeamCalendars(selectedCountry);
            if (teamCalendars.length > 0) {
                // Filter games based on the user's selected dates
                const selectedGames = teamCalendars.flatMap((teamCalendar) =>
                    teamCalendar.filter(
                        (game) => game.DateUtc >= startDate && game.DateUtc <= endDate
                    )
                );

                // Display the selected games 
                displayGames(selectedGames)

                console.log(selectedGames);
            } else {
                console.error('No team calendars found for the selected country.');
            }
        }
    });
   
   
});

function displayGames(games) {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = ''; // Clear the existing list

    if (games.length > 0){

    
        games.forEach((game) => {
            const { DateUtc, HomeTeam, AwayTeam, Location } = game;
            const gameDate = new Date(DateUtc);
            const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const formattedDate = gameDate.toLocaleString('en-US', options);
            const listItem = document.createElement('li');
            listItem.textContent = `${formattedDate} ${HomeTeam} vs ${AwayTeam}, stadium: ${Location}`;
            gamesList.appendChild(listItem);
        });
    } else {
        const noGamesMessage = `In ${selectedCountry} from ${startDate} to ${endDate}, there will not be any games, please choose different dates.`;
        document.getElementById('message').innerText = noGamesMessage;
    }
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


const leagueIds = {
    england: 39,
    germany: 78,
    spain: 140,
    italy: 135,
    france: 61
}