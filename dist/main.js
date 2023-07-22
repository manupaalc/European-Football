/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// console.log('this is not working')\n\n// import testGeoJSON from '../assets/test.geojson'; // Adjust the path if necessary\n\n// console.log(testGeoJSON);\n\n// import europeJSON from '../assets/europe_features.json';\n\n// console.log(europeJSON);\n\nconsole.log('this is not working again');\nfetch('../assets/europe_features.json').then(response => response.json()).then(europeJSON => {\n  console.log(europeJSON);\n}).catch(error => {\n  console.error('Error fetching JSON:', error);\n});\ndocument.addEventListener('DOMContentLoaded', () => {\n  // Fetch the GeoJSON data using the Fetch API\n  fetch('../assets/europe_features.json').then(response => response.json()).then(europeJSON => {\n    // Once the JSON data is loaded, you can access it in the 'europeJSON' variable\n    console.log(europeJSON);\n\n    // Perform data visualization with D3.js or any other logic here...\n\n    // For example, you can use D3.js to draw a simple map:\n    const mapContainer = document.getElementById('map-container');\n\n    // Create an SVG element for the map\n    const svg = d3.select(mapContainer).append('svg');\n\n    // Set the SVG dimensions (you may need to adjust these based on your requirements)\n    const width = 800;\n    const height = 600;\n    svg.attr('width', width).attr('height', height);\n\n    // Draw the map using D3.js and the 'europeJSON' data\n    const projection = d3.geoMercator().fitSize([width, height], europeJSON);\n    const path = d3.geoPath().projection(projection);\n    svg.selectAll('path').data(europeJSON.features).enter().append('path').attr('d', path).attr('stroke', 'black').attr('fill', 'lightblue');\n  }).catch(error => {\n    console.error('Error fetching JSON:', error);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZXVyb3BlSlNPTiIsImNhdGNoIiwiZXJyb3IiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtYXBDb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsInN2ZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwid2lkdGgiLCJoZWlnaHQiLCJhdHRyIiwicHJvamVjdGlvbiIsImdlb01lcmNhdG9yIiwiZml0U2l6ZSIsInBhdGgiLCJnZW9QYXRoIiwic2VsZWN0QWxsIiwiZGF0YSIsImZlYXR1cmVzIiwiZW50ZXIiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL2V1cm9wZWFuX2Zvb3RiYWxsLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgbm90IHdvcmtpbmcnKVxuXG4vLyBpbXBvcnQgdGVzdEdlb0pTT04gZnJvbSAnLi4vYXNzZXRzL3Rlc3QuZ2VvanNvbic7IC8vIEFkanVzdCB0aGUgcGF0aCBpZiBuZWNlc3NhcnlcblxuLy8gY29uc29sZS5sb2codGVzdEdlb0pTT04pO1xuXG4vLyBpbXBvcnQgZXVyb3BlSlNPTiBmcm9tICcuLi9hc3NldHMvZXVyb3BlX2ZlYXR1cmVzLmpzb24nO1xuXG4vLyBjb25zb2xlLmxvZyhldXJvcGVKU09OKTtcblxuY29uc29sZS5sb2coJ3RoaXMgaXMgbm90IHdvcmtpbmcgYWdhaW4nKVxuZmV0Y2goJy4uL2Fzc2V0cy9ldXJvcGVfZmVhdHVyZXMuanNvbicpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGV1cm9wZUpTT04pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXVyb3BlSlNPTik7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIEpTT046JywgZXJyb3IpO1xuICAgIH0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAvLyBGZXRjaCB0aGUgR2VvSlNPTiBkYXRhIHVzaW5nIHRoZSBGZXRjaCBBUElcbiAgICBmZXRjaCgnLi4vYXNzZXRzL2V1cm9wZV9mZWF0dXJlcy5qc29uJylcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChldXJvcGVKU09OKSA9PiB7XG4gICAgICAgICAgICAvLyBPbmNlIHRoZSBKU09OIGRhdGEgaXMgbG9hZGVkLCB5b3UgY2FuIGFjY2VzcyBpdCBpbiB0aGUgJ2V1cm9wZUpTT04nIHZhcmlhYmxlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldXJvcGVKU09OKTtcblxuICAgICAgICAgICAgLy8gUGVyZm9ybSBkYXRhIHZpc3VhbGl6YXRpb24gd2l0aCBEMy5qcyBvciBhbnkgb3RoZXIgbG9naWMgaGVyZS4uLlxuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgeW91IGNhbiB1c2UgRDMuanMgdG8gZHJhdyBhIHNpbXBsZSBtYXA6XG4gICAgICAgICAgICBjb25zdCBtYXBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gU1ZHIGVsZW1lbnQgZm9yIHRoZSBtYXBcbiAgICAgICAgICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdChtYXBDb250YWluZXIpLmFwcGVuZCgnc3ZnJyk7XG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgU1ZHIGRpbWVuc2lvbnMgKHlvdSBtYXkgbmVlZCB0byBhZGp1c3QgdGhlc2UgYmFzZWQgb24geW91ciByZXF1aXJlbWVudHMpXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IDgwMDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMDtcbiAgICAgICAgICAgIHN2Zy5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBEcmF3IHRoZSBtYXAgdXNpbmcgRDMuanMgYW5kIHRoZSAnZXVyb3BlSlNPTicgZGF0YVxuICAgICAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IGQzLmdlb01lcmNhdG9yKCkuZml0U2l6ZShbd2lkdGgsIGhlaWdodF0sIGV1cm9wZUpTT04pO1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGQzLmdlb1BhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuXG4gICAgICAgICAgICBzdmdcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuZGF0YShldXJvcGVKU09OLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBwYXRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAnYmxhY2snKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJ2xpZ2h0Ymx1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBKU09OOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG59KTtcblxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7QUFDeENDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUNsQ0MsSUFBSSxDQUFFQyxRQUFRLElBQUtBLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNuQ0YsSUFBSSxDQUFFRyxVQUFVLElBQUs7RUFDbEJOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxVQUFVLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQ0RDLEtBQUssQ0FBRUMsS0FBSyxJQUFLO0VBQ2RSLE9BQU8sQ0FBQ1EsS0FBSyxDQUFDLHNCQUFzQixFQUFFQSxLQUFLLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBQ05DLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTTtFQUNoRDtFQUNBUixLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FDbENDLElBQUksQ0FBRUMsUUFBUSxJQUFLQSxRQUFRLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDbkNGLElBQUksQ0FBRUcsVUFBVSxJQUFLO0lBQ2xCO0lBQ0FOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxVQUFVLENBQUM7O0lBRXZCOztJQUVBO0lBQ0EsTUFBTUssWUFBWSxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxlQUFlLENBQUM7O0lBRTdEO0lBQ0EsTUFBTUMsR0FBRyxHQUFHQyxFQUFFLENBQUNDLE1BQU0sQ0FBQ0osWUFBWSxDQUFDLENBQUNLLE1BQU0sQ0FBQyxLQUFLLENBQUM7O0lBRWpEO0lBQ0EsTUFBTUMsS0FBSyxHQUFHLEdBQUc7SUFDakIsTUFBTUMsTUFBTSxHQUFHLEdBQUc7SUFDbEJMLEdBQUcsQ0FBQ00sSUFBSSxDQUFDLE9BQU8sRUFBRUYsS0FBSyxDQUFDLENBQUNFLElBQUksQ0FBQyxRQUFRLEVBQUVELE1BQU0sQ0FBQzs7SUFFL0M7SUFDQSxNQUFNRSxVQUFVLEdBQUdOLEVBQUUsQ0FBQ08sV0FBVyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNMLEtBQUssRUFBRUMsTUFBTSxDQUFDLEVBQUVaLFVBQVUsQ0FBQztJQUN4RSxNQUFNaUIsSUFBSSxHQUFHVCxFQUFFLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUNKLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDO0lBRWhEUCxHQUFHLENBQ0VZLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FDakJDLElBQUksQ0FBQ3BCLFVBQVUsQ0FBQ3FCLFFBQVEsQ0FBQyxDQUN6QkMsS0FBSyxDQUFDLENBQUMsQ0FDUFosTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNkRyxJQUFJLENBQUMsR0FBRyxFQUFFSSxJQUFJLENBQUMsQ0FDZkosSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FDdkJBLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO0VBQ2xDLENBQUMsQ0FBQyxDQUNEWixLQUFLLENBQUVDLEtBQUssSUFBSztJQUNkUixPQUFPLENBQUNRLEtBQUssQ0FBQyxzQkFBc0IsRUFBRUEsS0FBSyxDQUFDO0VBQ2hELENBQUMsQ0FBQztBQUNWLENBQUMsQ0FBQyJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ldXJvcGVhbl9mb290YmFsbC8uL3NyYy9pbmRleC5zY3NzPzhlYjUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;