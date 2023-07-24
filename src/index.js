

document.addEventListener('DOMContentLoaded', () => {
  
    const highlightedCountries = ['Spain', 'Italy', 'France', 'Germany', 'United Kingdom'];
    let selectedCountry = null;

    // Fetch the GeoJSON data using the Fetch API
    fetch('../assets/europe_features.json')
        .then((response) => response.json())
        .then((europeJSON) => {
            const mapContainer = document.getElementById('map-container');

            // Create an SVG element for the map
            const svg = d3.select(mapContainer).append('svg');

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
                .on('mouseover', function (event, feature) {
                    // Change the fill color on hover
                    if (highlightedCountries.includes(feature.properties.name)) {
                        d3.select(this).attr('fill', 'lightblue'); // Apply lightblue color on hover for highlighted countries
                    }
                })
                .on('mouseout', function () {
                    // Restore the default fill color when not hovered
                    d3.select(this).attr('fill', (feature) => {
                        if (highlightedCountries.includes(feature.properties.name)) {
                            return 'lightgreen'; // Apply lightblue color for highlighted countries
                        } else {
                            return 'gray'; // Apply gray color for other countries
                        }
                    });
                })
                .on('click', function (event, feature) {
                    // Check if the clicked country is in the highlightedCountries array
                    if (highlightedCountries.includes(feature.properties.name)) {
                        // Zoom in on click for the highlighted countries
                        const [[x0, y0], [x1, y1]] = path.bounds(feature); // Get the bounding box of the clicked country
                        const [cx, cy] = [(x0 + x1) / 2, (y0 + y1) / 2]; // Calculate the centroid of the bounding box
                        const scale = 2; // Set the desired scale factor for zooming in
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
                        d3.select(this).attr('fill', 'green');
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
            'France': ['paris.json', 'olimpique.json'],
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

    games.forEach((game) => {
        const { DateUtc, HomeTeam, AwayTeam, Location } = game;
        const gameDate = new Date(DateUtc);
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = gameDate.toLocaleString('en-US', options);
        const listItem = document.createElement('li');
        listItem.textContent = `${formattedDate} ${HomeTeam} vs ${AwayTeam}, stadium: ${Location}`;
        gamesList.appendChild(listItem);
    });
}
