    #European Football

This website will serve as a valuable resource for travelers visiting Europe who are interested in exploring some of the region's top football teams. With its user-friendly interface, the website will provide essential information about scheduled matches, team statistics, and an overview of the overall competitive landscape.

https://manupaalc.github.io/European-Football/

##Technologies used:

1.  Frontend: HTML, CSS, and JavaScript were used to create the user interface and interactivity of the web         application.

2.  Map Visualization: D3.was employed to draw an interactive map of Europe, displaying football team information and fixtures.

3.  Backend: Node.js with Express.js as the framework served as the lightweight proxy server, allowing communication with third-party APIs and avoiding CORS issues.

4.  HTTP Requests: Axios, a JavaScript library, facilitated making API requests from the frontend to the backend proxy server.

5.  Data Format: JSON was used for data exchange between frontend and backend, as well as for storing GeoJSON data for map visualization.

6.  Version Control: Git and GitHub enabled efficient collaboration, version tracking, and code sharing among team members.

7.  Environment Variables: Sensitive data, such as API keys, was securely stored using environment variables on the server-side.

##Challenges:

1.  Interactive map visualization:

    Challenge: Creating an interactive map of Europe using D3.js required handling GeoJSON data and managing event interactions efficiently.
    Solution: By using D3.js for map rendering and proper data manipulation, the team achieved a seamless and responsive map experience. Event listeners were utilized to allow users to click on countries, view tooltips, and highlight selected countries for trip planning.

2.  Backend Proxy with axios request
    Challenge: Making API requests directly from the frontend using Axios to third-party APIs could lead to empty response when passing more than one argument.
    Solution: Adapt the proxy logic to pass the arguments as params before the url just when there is more than one argument to pass.

