

// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch the GeoJSON data using the Fetch API
//     fetch('../../assets/europe_features.json')
//         .then((response) => response.json())
//         .then((europeJSON) => {
//             // Once the JSON data is loaded, you can access it in the 'europeJSON' variable
//             console.log(europeJSON);

//             // Perform data visualization with D3.js or any other logic here...

//             // For example, you can use D3.js to draw a simple map:
//             const mapContainer = document.getElementById('map-container');

//             // Create an SVG element for the map
//             const svg = d3.select(mapContainer).append('svg');

//             // Set the SVG dimensions (you may need to adjust these based on your requirements)
//             const width = 800;
//             const height = 600;
//             svg.attr('width', width).attr('height', height);

//             // Draw the map using D3.js and the 'europeJSON' data
//             const projection = d3.geoMercator().fitSize([width, height], europeJSON);
//             const path = d3.geoPath().projection(projection);

//             svg
//                 .selectAll('path')
//                 .data(europeJSON.features)
//                 .enter()
//                 .append('path')
//                 .attr('d', path)
//                 .attr('stroke', 'black')
//                 .attr('fill', 'lightblue');
//         })
//         .catch((error) => {
//             console.error('Error fetching JSON:', error);
//         });
// });