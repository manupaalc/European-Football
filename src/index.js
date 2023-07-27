
let countrySelected = false;
let svg;
let selectDifferentBtn;



document.addEventListener('DOMContentLoaded', () => {

    // Add the welcome message container and button dynamically
    const welcomeMessageContainer = document.createElement('div');
    welcomeMessageContainer.id = 'welcome-message';
    welcomeMessageContainer.classList.add('welcome-message');
    welcomeMessageContainer.innerHTML = `
    <p>
      Welcome to European Football. Planning on traveling to the old continent? Let us know the country and dates of your trip and we will show you the most exciting games going on during your trip.
    </p>
    <button id="close-message-btn">Go ahead!</button>
  `;
    document.body.appendChild(welcomeMessageContainer);

    // Check if the welcome message has been shown before
    const isWelcomeMessageShown = localStorage.getItem('welcomeMessageShown');

    // Get the welcome message container
    const welcomeMessage = document.getElementById('welcome-message');

    // Get the close button
    const closeButton = document.getElementById('close-message-btn');

    // Show the welcome message if it's the first visit
    if (!isWelcomeMessageShown) {
        welcomeMessage.style.display = 'block';
    }

    // Add click event listener to the close button
    closeButton.addEventListener('click', () => {
        // Hide the welcome message
        welcomeMessage.style.display = 'none';
        // Mark the welcome message as shown in local storage
        localStorage.setItem('welcomeMessageShown', true);
    });
    

    //declare the countries that will have interaction with the user
    const highlightedCountries = ['Spain', 'Italy', 'France', 'Germany', 'United Kingdom'];
    let selectedCountry = null;
    

    // Fetch the GeoJSON data using the Fetch API
    fetch('assets/europe_features.json')
        .then((response) => response.json())
        .then((europeJSON) => {
            const mapContainer = document.getElementById('map-container');
            // Add a tooltip element to the map container
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            mapContainer.appendChild(tooltip);

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

                //creating a tooltip with the name of the country
                .on('mouseover', (event, feature) => {
                    // Check if the hovered country is in the highlighted countries list
                    if (highlightedCountries.includes(feature.properties.name)) {
                        // Position and display the tooltip
                        tooltip.style.display = 'block';
                        tooltip.style.left = `${event.pageX + 10}px`;
                        tooltip.style.top = `${event.pageY - 25}px`; // Adjust the top position as needed
                        tooltip.textContent = feature.properties.name;
                    }
                })

                //erasing the tooltip when hovering off the country
                .on('mouseout', () => {
                    tooltip.style.display = 'none';
                })
                .on('click', function (event, feature) {
                    // Check if the clicked country is in the highlightedCountries array
                    if (highlightedCountries.includes(feature.properties.name)) {
                        // Zoom in on click for the highlighted countries
                        if(selectedCountry){
                             resetMapColors();
                            document.getElementById('games-list').innerHTML = '';//clear the list of games
                        }
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
          
            });
            
        })
        .catch((error) => {
            console.error('Error fetching JSON:', error);
        });

   

        // Function to load JSON data for the selected country's teams
    async function loadCountryTeamCalendars(selectedCountry) {
        const teamFiles = {
            'Spain': ['atletico.json', 'barcelona.json', 'madrid.json'],
            'England': ['arsenal.json', 'chelsea.json', 'liverpool.json', 'mancity.json', 'manutd.json'],
            'France': ['paris.json', 'olympique.json'],
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
console.log('updated')